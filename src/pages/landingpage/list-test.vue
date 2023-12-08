<template>
  <div  class=" border-t sm:mt-6 sm:pt-16 ">
    <div class="bg-gray-100 rounded rounded-lg p-10">
<!-- Button to toggle the visibility of the form (visible only to admin and manager) -->
<button v-if="userRole === 'admin' || userRole === 'manager'" @click="toggleFormVisibility" class="px-4 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700">Employee Form</button>

<!-- Form enclosed in a div with v-show directive -->
<div v-show="isFormVisible">
  <div v-if="userRole === 'admin' || userRole === 'manager'" class="mx-auto mt-10 max-w-2xl">
    <form @submit.prevent="isEditing ? updatePerson() : addPerson" class="divide-y divide-gray-100">
      <h2 class="mt-4 mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ isEditing ? 'Edit user' : 'Add new Employee' }}</h2>

      <!-- Input fields with border and shadow -->
      <input v-model="newPerson.name" placeholder="Name" required class="w-full p-2 border border-gray-300 shadow-md mb-4" />
      <input v-model="newPerson.email" placeholder="Email" required class="w-full p-2 border border-gray-300 shadow-md mb-4" />
      <input v-model="newPerson.comment" placeholder="Comment" required class="w-full p-2 border border-gray-300 shadow-md mb-4" />
      <input v-model="newPerson.imageUrl" placeholder="Image URL" class="w-full p-2 border border-gray-300 shadow-md mb-4" />
      <input v-model="newPerson.role" placeholder="Role" class="w-full p-2 border border-gray-300 shadow-md mb-4" />

      <!-- Button at the end of the form -->
      <div class="flex justify-start pt-5">
        <button type="submit" class="px-4 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700">
          {{ isEditing ? 'Update Employee' : 'Add Employee' }}
        </button>
      </div>
    </form>
  </div>
</div>
    </div>

    <br />
    <br />

    <!-- List of people -->
    <div class="bg-gray-100 rounded rounded-lg p-10">
      <h3 class="text-3xl text-gray-900 ">Our Esteemed Employees</h3>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
        <!-- Display person information -->
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
          <div class="flex-wrap min-w-0 gap-x-4 justify-start">
            <p class="text-left text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
            <p class="flex-wrap text-left mt-1 truncate text-xs leading-5 text-indigo-500">{{ person.role }}</p>
            <p class="text-left mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
            <p class="flex-wrap text-left mt-1 truncate text-xs leading-5 text-gray-500">{{ person.comment }}</p>
          </div>
        </div>

        <!-- Display role and CRUD actions -->
        <div v-if="userRole === 'admin'" class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
          <div class="flex items-center gap-x-2">
            <button @click="editPerson(person)" class="text-indigo-500">Edit</button>
            <button @click="deletePerson(person)" class="text-red-500">Delete</button>
          </div>
        </div>
      </li>
    </ul>
    </div>
    
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
const people = ref([
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Admin',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Dries Martens',
    email: 'michael.foster@example.com',
    role: 'Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Manager',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Employee',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh1bWFufGVufDB8fDB8fHww',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Employee',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1682965699797-a2bd37f62b45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGh1bWFufGVufDB8fDB8fHww',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Employee',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl:
      'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
])
  
const newPerson = ref({ name: '', email: '', comment: '', imageUrl: '' });
const isEditing = ref(false);
let editingIndex = -1;

const userRole = ref('admin'); // Set the user role here

const isFormVisible = ref(false);

const toggleFormVisibility = () => {
  isFormVisible.value = !isFormVisible.value;
};

const addPerson = () => {
  // Add new person to the people array (visible only to admin and manager)
  if (userRole.value === 'admin' || userRole.value === 'manager') {
    people.value.push({ ...newPerson.value });
    // Clear the form fields
    clearForm();
  }
};

const editPerson = (person) => {
  // Edit functionality (visible only to admin and manager)
  if (userRole.value === 'admin' || userRole.value === 'manager') {
    newPerson.value = { ...person };
    isEditing.value = true;
    editingIndex = people.value.findIndex((p) => p.email === person.email);
    // Toggle form visibility when Edit button is clicked
    toggleFormVisibility();
  }
};

const updatePerson = () => {
  // Update functionality (visible only to admin and manager)
  if (userRole.value === 'admin' || userRole.value === 'manager') {
    people.value[editingIndex] = { ...newPerson.value };
    clearForm();
  }
};

const deletePerson = (person) => {
  // Delete functionality (visible only to admin)
  if (userRole.value === 'admin') {
    const index = people.value.findIndex((p) => p.email === person.email);
    if (index !== -1) {
      people.value.splice(index, 1);
    }
  }
};

const clearForm = () => {
  newPerson.value = { name: '', email: '', comment: '', imageUrl: '' };
  isEditing.value = false;
  editingIndex = -1;
};

  </script>
  