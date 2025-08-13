<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Detail Mahasiswa</h2>
      <div class="space-x-2" v-if="mahasiswa">
        <router-link
          :to="{ name: 'mahasiswa.edit', params: { id: mahasiswa.id } }"
          class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </router-link>
        <router-link
          to="/mahasiswa"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Kembali ke Daftar
        </router-link>
        <!-- Tombol Print -->
        <button
          @click="printDetail"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Print / Download PDF
        </button>
      </div>
    </div>

    <!-- Detail Mahasiswa -->
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mx-auto"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>

    <div v-else-if="mahasiswa" class="bg-white shadow-md rounded p-6" id="detail-mahasiswa">
      <div class="grid grid-cols-12 gap-y-4">
        <div class="col-span-12 md:col-span-2 font-semibold">NIM</div>
        <div class="col-span-12 md:col-span-10">{{ mahasiswa.nim }}</div>
        <div class="col-span-12 md:col-span-2 font-semibold">Nama</div>
        <div class="col-span-12 md:col-span-10">{{ mahasiswa.nama }}</div>
        <div class="col-span-12 md:col-span-2 font-semibold">Jurusan</div>
        <div class="col-span-12 md:col-span-10">{{ mahasiswa.jurusan }}</div>
        <div class="col-span-12 md:col-span-2 font-semibold">Email</div>
        <div class="col-span-12 md:col-span-10">{{ mahasiswa.email }}</div>
        <div class="col-span-12 md:col-span-2 font-semibold">Alamat</div>
        <div class="col-span-12 md:col-span-10">{{ mahasiswa.alamat || '-' }}</div>
        <div class="col-span-12 md:col-span-2 font-semibold">Tanggal Lahir</div>
        <div class="col-span-12 md:col-span-10">{{ formatDate(mahasiswa.tanggal_lahir) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMahasiswaStore } from '../../../stores/mahasiswa';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const store = useMahasiswaStore();
    const route = useRoute();

    const mahasiswa = computed(() => store.mahasiswa);
    const loading = computed(() => store.loading);
    const error = computed(() => store.error);

    const formatDate = (dateString) => {
      if (!dateString) return '-';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const printDetail = () => {
      window.print(); // langsung membuka dialog print browser
    };

    onMounted(() => {
      store.fetchMahasiswa(props.id);
    });

    return { mahasiswa, loading, error, formatDate, printDetail };
  },
};
</script>
