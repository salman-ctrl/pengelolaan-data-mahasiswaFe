<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Brand -->
          <router-link to="/" class="text-lg font-bold hover:text-blue-400">
            Laravel-Vue CRUD
          </router-link>

          <!-- Mobile Toggle -->
          <button 
            @click="isOpen = !isOpen" 
            class="sm:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Menu -->
          <div class="hidden sm:flex sm:space-x-4">
            <router-link 
              to="/mahasiswa" 
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
              active-class="bg-gray-800 text-white font-bold"
            >
              Mahasiswa
            </router-link>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isOpen" class="sm:hidden px-2 pt-2 pb-3 space-y-1">
        <router-link 
          to="/mahasiswa" 
          class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-800 text-white font-bold"
        >
          Mahasiswa
        </router-link>
      </div>
    </nav>

    <!-- Content -->
    <div class="max-w-7xl mx-auto mt-6 px-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isOpen: false
    }
  }
}
</script>

