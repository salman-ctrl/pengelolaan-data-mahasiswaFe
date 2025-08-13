<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
            Daftar Mahasiswa
        </h2>
        <div class="space-x-2">
            <router-link 
              to="/mahasiswa/create" 
              class="px-3 py-2 bg-blue-700 text-white rounded-sm focus:ring-2 focus:ring-offset-2 shadow-md"
            >
                Tambah Mahasiswa
            </router-link>
            <button 
              @click="exportExcel"
              class="px-3 py-2 bg-green-600 text-white rounded-sm shadow-md hover:bg-green-700 transition"
            >
              Export Excel
            </button>
        </div>
    </div>
    
    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <svg
        class="animate-spin h-8 w-8 text-blue-600 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
    </div>

    <!-- Table -->
    <div v-else>
        <table class="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-100">
                    <th class="text-left px-4 py-2 border-b border-gray-300">Nomor</th>
                    <th class="text-left px-4 py-2 border-b border-gray-300">NIM</th>
                    <th class="text-left px-4 py-2 border-b border-gray-300">Nama</th>
                    <th class="text-left px-4 py-2 border-b border-gray-300">Jurusan</th>
                    <th class="text-left px-4 py-2 border-b border-gray-300">Email</th>
                    <th class="text-left px-4 py-2 border-b border-gray-300">Aksi</th>
                </tr> 
            </thead>

            <tbody>
                <tr v-for="(mahasiswa, index) in mahasiswas" :key="mahasiswa.id" class="hover:bg-gray-50">
                  <td class="px-4 py-2 border-b border-gray-200">{{ index+1}}</td>
                  <td class="px-4 py-2 border-b border-gray-200">{{ mahasiswa.nim }}</td>
                  <td class="px-4 py-2 border-b border-gray-200">{{ mahasiswa.nama }}</td>
                  <td class="px-4 py-2 border-b border-gray-200">{{ mahasiswa.jurusan }}</td>
                  <td class="px-4 py-2 border-b border-gray-200">{{ mahasiswa.email }}</td>
                  <td class="px-4 py-2 border-b border-gray-200 space-x-2">
                    <router-link :to="{name:'mahasiswa.show', params:{id:mahasiswa.id}}" class="text-blue-600 hover:underline">
                        Detail
                    </router-link>
                    <router-link :to="{name:'mahasiswa.edit', params:{id:mahasiswa.id}}" class="text-yellow-600 hover:underline">
                        Edit
                    </router-link>
                    <button @click="deleteMahasiswa(mahasiswa.id)" class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded">
                        Hapus
                    </button>
                  </td>    
                </tr>
            </tbody>
        </table>

        <div v-if="mahasiswas.length === 0" class="bg-blue-100 border-blue-400 text-blue-700 px-4 py-3 rounded mt-4">
            Tidak Ada Mahasiswa
        </div>
    </div>

  </div>
</template>

<script setup>
import {useMahasiswaStore} from '../../../stores/mahasiswa'
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const store = useMahasiswaStore();
const router = useRouter();

const mahasiswas = computed(()=>store.mahasiswas);
const loading = computed(() => store.loading);
const error = computed(()=>store.error);

const deleteMahasiswa = async (id) => {
  if(confirm('Apakah yakin ingin menghapus mahasiswa ini?')) {
    try {
      const { success, error } = await store.deleteMahasiswa(id);
      
      if (success) {
        alert('Mahasiswa berhasil dihapus');
      } else {
        alert(`Gagal menghapus: ${error}`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Terjadi kesalahan sistem');
    }
  }
}

const exportExcel = () => {
  if (mahasiswas.value.length === 0) {
    alert('Tidak ada data untuk di-export');
    return;
  }

  const data = mahasiswas.value.map((m, index) => ({
    No: index + 1,
    NIM: m.nim,
    Nama: m.nama,
    Jurusan: m.jurusan,
    Email: m.email,
    Alamat: m.alamat || '-',
    'Tanggal Lahir': m.tanggal_lahir ? new Date(m.tanggal_lahir).toLocaleDateString('id-ID') : '-'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mahasiswa");

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `Daftar_Mahasiswa.xlsx`);
}

onMounted(()=>{
    store.fetchMahasiswas();
})
</script>
