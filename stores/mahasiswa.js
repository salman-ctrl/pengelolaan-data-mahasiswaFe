import { defineStore } from "pinia";
import axios from "axios";

export const useMahasiswaStore = defineStore('mahasiswa', {
    state: () => ({
        mahasiswas: [],
        mahasiswa: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchMahasiswas() {
            this.loading = true;
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/mahasiswa');
                this.mahasiswas = response.data.data;
                this.error = null;
            } catch (err) {
                this.error = err.response?.data?.message || 'gagal memuat data mahasiswa';
            } finally {
                this.loading = false;
            }
        },

        async fetchMahasiswa(id) {
            this.loading = true
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/mahasiswa/${id}`);
                this.mahasiswa = response.data.data;
                this.error = null;
            } catch (err) {
                this.error = err.response?.data?.message || 'gagal memuat data mahasiswa';
            } finally {
                this.loading = false;
            }
        },

        async createMahasiswa(formData) {
            this.loading = true;

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/mahasiswa', formData);
                this.mahasiswas.push(response.data.data);
                this.error = null;
                console.log('berhasil menambahkan mahasiswa')
                return { success: true, data: response.data };
            } catch (err) {
                this.error = err.response?.data?.errors || 'Gagal memuat detail Mahasiswa';
                return { success: false, errors: err.response?.data?.errors };
            } finally {
                this.loading = false
            }
        },

        async updateMahasiswa({ id, formData }) {
            this.loading = true;
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/mahasiswa/${id}`, formData);
                const index = this.mahasiswas.findIndex(m => m.id === id);
                if (index != -1) {
                    this.mahasiswas[index] = response.data.data;
                }
                this.error = null;
                return { success: true, data: response.data };
            } catch (err) {
                this.error = err.response?.data?.errors || 'Gagal memuat data Mahasiswa';
                return { success: false, errors: err.response?.data?.errors };
            } finally {
                this.loading = false;
            }
        },

        async deleteMahasiswa(id) {
            this.loading = true;
            try {
                // Convert id ke string untuk konsistensi (sesuaikan dengan backend)
                id = String(id);

                const response = await axios.delete(`http://127.0.0.1:8000/api/mahasiswa/${id}`);

                // Debugging
                console.log('Delete response:', response);

                // Handle berbagai jenis response API
                if (response.status === 200 || response.status === 204) {
                    this.mahasiswas = this.mahasiswas.filter(m => String(m.id) !== id);
                    this.error = null;
                    return { success: true, error: null };
                }

                throw new Error(`Unexpected status code: ${response.status}`);

            } catch (err) {
                console.error('Delete error:', err);
                const errorMsg = err.response?.data?.message ||
                    err.message ||
                    `Gagal menghapus mahasiswa ${id}`;
                this.error = errorMsg;
                return { success: false, error: errorMsg };
            } finally {
                this.loading = false;
            }
        }

    },
});