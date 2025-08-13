<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Tambah Mahasiswa Baru</h2>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <span class="sr-only">Loading...</span>
    </div>

    <form @submit.prevent="submitForm" v-else class="space-y-4">
      <div>
        <label for="nim" class="block text-sm font-medium text-gray-700 mb-1">NIM</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.nim }"
          id="nim"
          v-model="form.nim"
        >
        <div v-if="errors.nim" class="mt-1 text-sm text-red-600">
          {{ errors.nim[0] }}
        </div>
      </div>

      <div>
        <label for="nama" class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.nama }"
          id="nama"
          v-model="form.nama"
        >
        <div v-if="errors.nama" class="mt-1 text-sm text-red-600">
          {{ errors.nama[0] }}
        </div>
      </div>

      <div>
        <label for="jurusan" class="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
        <input
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.jurusan }"
          id="jurusan"
          v-model="form.jurusan"
        >
        <div v-if="errors.jurusan" class="mt-1 text-sm text-red-600">
          {{ errors.jurusan[0] }}
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.email }"
          id="email"
          v-model="form.email"
        >
        <div v-if="errors.email" class="mt-1 text-sm text-red-600">
          {{ errors.email[0] }}
        </div>
      </div>

      <div>
        <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
        <textarea
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.alamat }"
          id="alamat"
          v-model="form.alamat"
          rows="3"
        ></textarea>
        <div v-if="errors.alamat" class="mt-1 text-sm text-red-600">
          {{ errors.alamat[0] }}
        </div>
      </div>

      <div>
        <label for="tanggal_lahir" class="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
        <input
          type="date"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.tanggal_lahir }"
          id="tanggal_lahir"
          v-model="form.tanggal_lahir"
        >
        <div v-if="errors.tanggal_lahir" class="mt-1 text-sm text-red-600">
          {{ errors.tanggal_lahir[0] }}
        </div>
      </div>

      <div class="flex space-x-3 pt-4">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          :disabled="loading"
        >
          Simpan
        </button>
        <router-link
          to="/mahasiswa"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Kembali
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMahasiswaStore } from '../../../stores/mahasiswa';
import { useToast } from 'vue-toastification';

const toast = useToast();
const store = useMahasiswaStore();
const router = useRouter();

const form = ref({
  nim: '',
  nama: '',
  jurusan: '',
  email: '',
  alamat: '',
  tanggal_lahir: '',
});

const errors = ref({});
const loading = ref(false);

const submitForm = async () => {
  loading.value = true;
  const { success, data, errors: err } = await store.createMahasiswa(form.value);
  
  if (success) {
   // Contoh menggunakan library seperti vue-toastification
toast.success('Mahasiswa berhasil ditambahkan');
    router.push({ name: 'mahasiswa.list' });
  } else {
    errors.value = err || {};
  }
  
  loading.value = false;
};
</script>