<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">
      Edit Data Mahasiswa
    </h2>
    <div v-if="loading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500">
      </div>
    </div>

    <form @submit.prevent="submitForm" v-else-if="mahasiswa" class="space-y-4">
      <div>
        <label for="nim" class="block text-sm font-medium text-gray-700 mb-1">NIM</label>
        <input type="text"
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        id="nim"
        v-model="form.nim"
        :class="{'border-red-500': errors.nim}"
        >
        <div v-if="errors.nim" class="text-red-600 text-sm mt-1">
          {{ errors.nim[0] }}
        </div>
      </div>
      <div>
      <label for="nama" class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
      <input
         type="text"
         class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
         id="nama"
         v-model="form.nama"
         :class="{'border-red-500': errors.nama}"
         >
         <div v-if="errors.nama" class="text-red-600 text-sm mt-1">
          {{ errors.nama[0] }}
         </div>
        </div>

        <div>
          <label for="jurusan" class="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
          <input 
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          id="jurusan"
          v-model="form.jurusan"
          :class="{'border-red-500': errors.jurusan}"
          >

          <div v-if="errors.jurusan" class="text-red-600 text-sm mt-1">
          </div>
        </div>
       
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          v-model="form.email"
          :class="{'border-red-500': errors.email}"
          >

          <div v-if="errors.email" class="text-red-600 text-sm mt-1">
            {{ errors.email[0] }}
          </div>
        </div>

        <div>
          <label for="alamat" class="block text-sm font-medium text-gray-700 mb-1"></label>

          <textarea class="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
          id="alamat"
          v-model="form.alamat"
          :class="{'border-red-500': errors.alamat}"
          >
          </textarea>
          <div v-if="errors.alamat" class="text-red-600 text-sm mt-1">
            {{ errors.alamat[0] }}
          </div>
        </div>

        <div>
          <label for="tanggal_lahir" class="block text-sm font-medium to-gray-700 mb-1">
            Tanggal Lahir
          </label>
          <input 
          type="text"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          v-model="form.tanggal_lahir"
          :class="{'border-red-500': errors.tanggal_lahir}"
          >
          <div v-if="errors.tanggal_lahir" class="text-red-600 text-sm mb-1">
            {{ errors.tanggal_lahir[0] }}
          </div>
        </div>

        <div class="flex space-x-2">
          <button 
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 disabled:opacity-y-50"
          :disabled="loading"
          >
          Update
          </button> 

          <router-link :to="{name: 'mahasiswa.show', params:{id: mahasiswa.id}}" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2">
            Kembali
          </router-link>
        </div>
    </form>
<div v-else-if="error" class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
  {{ error }}
</div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted, computed} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useMahasiswaStore } from '../../../stores/mahasiswa';

const props = defineProps({
  id:{
    type:[String,Number],
    required:true,
  }
})

const store = useMahasiswaStore()
const route = useRoute()
const router = useRouter()

const form = reactive({
  nim: '',
  nama: '',
  jurusan: '',
  alamat: '',
  tanggal_lahir: '',
})

const errors = ref({})
const loading = ref(false)

const mahasiswa = computed(()=> store.mahasiswa)
const error = computed(()=>store.error)

onMounted(async()=>{
  await store.fetchMahasiswa(props.id)
  if(store.mahasiswa){
    Object.assign(form, store.mahasiswa)
  }
})

const submitForm = async()=>{
  loading.value = true
  const {success} = await store.updateMahasiswa({
    id: props.id,
    formData: form,
  })

  if(success){
    alert('Mahasiswa Berhasil diupdate')
    router.push({name:'mahasiswa.show', params:{id: props.id}})
  }else{
    errors.value = store.error || {}
  }

  loading.value = false;
}
</script>