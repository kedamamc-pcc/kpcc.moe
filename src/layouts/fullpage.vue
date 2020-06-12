<template lang="pug">
div(class="relative min-h-screen flex flex-col")
  router-link(tag="button" to="/" class="absolute top-0 left-0 w-8 h-8 m-6 text-black bg-white hover:bg-cool-gray-50 shadow flex items-center justify-center" style="z-index: 999;")
    svg(viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6")
      <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" />
  slot
</template>
