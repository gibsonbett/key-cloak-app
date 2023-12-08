<template >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl px-6 lg:px-8 items-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome to our Human Resource Management System!</h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">We value the needs of our Employees</p>
        </div>
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-6 border-t border-gray-250 pt-10 sm:mt-6 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="post in posts" :key="post.id" class="flex max-w-xl flex-wrap justify-">
            <div class="flex items-center gap-x-4 text-xs">
              <time :datetime="post.datetime" class="text-gray-500">{{ post.date }}</time>
              <a :href="post.category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{{ post.category.title }}</a>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a :href="post.author.href">
                    <span class="absolute inset-0" />
                    {{ post.author.name }}
                  </a>
                </p>
                <p class="text-gray-600 text-indigo-500">{{ post.author.role }}</p>
              </div>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a :href="post.href">
                  <span class="absolute inset-0" />
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ post.description }}</p>
            </div>
          </article>
        </div>
        <br/>
        <br/>
        <list/>
      </div>
  </template>

<script setup>
import list from "./list-test"
const posts = [
  {
    id: 1,
    title: 'Get updates faster',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Dec 6, 2023',
    datetime: '2023-12-06',
    category: { title: 'Management', href: '#' },
    author: {
      name: 'Harry Potter',
      role: 'Founder/CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]
</script>