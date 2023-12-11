<template>
  <div class="border-t sm:mt-6 sm:pt-16">
    <div class="bg-gray-100 rounded rounded-lg p-10">
      <!-- Button to toggle the visibility of the form (visible only to admin and manager) -->
      <button
        v-if="userRole === 'admin' || userRole === 'manager'"
        @click="toggleFormVisibility"
        class="px-4 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700"
      >
        New Employee?
      </button>

      <!-- Form enclosed in a div with v-show directive -->
      <!-- <teleport to="body"> -->
        <div
          v-show="isFormVisible"
          class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        >
          <div
            @click="closeForm"
            class="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          ></div>
          <div class="z-10 bg-white p-8 rounded-lg shadow-md w-3/5">
            <form
              @submit.prevent="isEditing ? updatePerson() : addPerson()"
              class="divide-y divide-gray-100"
             
            >
              <!-- Input fields with border and shadow -->
              <input
                v-model="newPerson.fullName"
                placeholder="Name"
                required
                class="w-3/4 p-4 block text-sm font-medium leading-6 text-gray-900"
              />
              <input
                v-model="newPerson.email"
                placeholder="Email"
                required
                class="w-3/4 p-4 block text-sm font-medium leading-6 text-gray-900"
              />
              <input
                v-model="newPerson.description"
                placeholder="Description"
                required
                class="w-3/4 p-4 block text-sm font-medium leading-6 text-gray-900"
              />
              <!-- <input
                v-model="newPerson.imageUrl"
                placeholder="Image URL"
                class="w-3/4 p-4 block text-sm font-medium leading-6 text-gray-900"
              /> -->
              <input
                v-model="newPerson.title"
                placeholder="Title"
                class="w-3/4 p-4 block text-sm font-medium leading-6 text-gray-900"
              />
              <!-- Button at the end of the form -->
              <div class="flex justify-start pt-5">
                <button
                  type="submit"
                  class="px-4 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700"
                >
                  {{ isEditing ? "Update Employee" : "Add Employee" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      <!-- </teleport> -->
    </div>

    <br />
    <br />

    <!-- List of people -->
    <div class="bg-gray-100 rounded rounded-lg p-10">
      <h3 class="text-3xl text-gray-900">Our Esteemed Employees</h3>
      <ul role="list" class="divide-y divide-gray-100">
        <li
          v-for="person in people"
          :key="person.value"
          class="flex justify-between gap-x-6 py-5"
        >
          <!-- Display person information -->
          <div class="flex min-w-0 gap-x-4" @click="openCard(person)">
            <img
              class="h-12 w-12 flex-none rounded-full bg-gray-50"
              :src="person.imageUrl"
              alt=""
            />
            <div class="flex-wrap min-w-0 gap-x-4 justify-start">
              <p
                class="text-left text-sm font-semibold leading-6 text-gray-900"
              >
                {{ person.fullName }}
              </p>
              <p
                class="flex-wrap text-left mt-1 truncate text-xs leading-5 text-indigo-500"
              >
                {{ person.title }}
              </p>
              <p v-if="person.email"
                class="text-left mt-1 truncate text-xs leading-5 text-gray-500"
              >
                {{ person.email }}
              </p>
              <p
                class="flex-wrap text-left mt-1 truncate text-xs leading-5 text-gray-500"
              >
                {{ person.description }}
              </p>
            </div>
          </div>

          <!-- Display role and CRUD actions -->
          <div
            class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
          >
            <!-- <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p> -->
            <div class="flex items-center gap-x-2">
              <button v-if="userRole === 'admin' || userRole === 'manager' " @click=" editPerson(person)" class="text-indigo-500">
                Edit
              </button>
              <button v-if="userRole === 'admin'" @click="deletePerson(person)" class="text-red-500">
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <PersonCard
    :person="selectedPerson"
    :is-visible="selectedPerson !== null"
    @close="closeCard"
  />
</template>
<script setup>
import { ref, onMounted } from 'vue';
import PersonCard from './PersonCard';

const people = ref([]);
const newPerson = ref({ fullName: '', email: '', description: '', title: '' });
const isEditing = ref(false);
let editingIndex = -1;

const userRole = ref('admin'); // Set the user role here

const isFormVisible = ref(false);

const toggleFormVisibility = () => {
  isFormVisible.value = !isFormVisible.value;
};

const fetchData = async () => {
  try {
    const response = await fetch('http://192.168.100.37:8085/employees');
    const data = await response.json();
    people.value = data.data; // Assign data to the ref, not a local variable
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const addPerson = async () => {
  // Add new person to the backend and update the local data
  if (userRole.value === 'admin' || userRole.value === 'manager') {
    try {
      console.log('Before fetch:', newPerson.value);

      const response = await fetch('http://192.168.100.37:8085/addEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson.value),
      });

      console.log('After fetch:', response);

      if (response.ok) {
        // Update the local data only if the request was successful
        await fetchData();
        clearForm();
        closeForm()
      } else {
        // Handle the case where the server returns an error
        console.error('Error adding person:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error adding person:', error);
    }
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

const updatePerson = async () => {
  // Update functionality (visible only to admin and manager)
  if (userRole.value === 'admin' || userRole.value === 'manager') {
    try {
      const response = await fetch(`http://192.168.100.37:8085/updateEmployee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPerson.value),
      });

      if (response.ok) {
        people.value[editingIndex] = { ...newPerson.value };
        clearForm();
      } else {
        console.error('Error updating person:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating person:', error);
    }
  }
};


const deletePerson = async (person) => {
  // Delete functionality (visible only to admin)
  if (userRole.value === 'admin') {
    try {
      const response = await fetch(`YOUR_API_ENDPOINT/${person.email}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const index = people.value.findIndex((p) => p.email === person.email);
        if (index !== -1) {
          people.value.splice(index, 1);
        }
      } else {
        console.error('Error deleting person:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  }
};

const clearForm = () => {
  newPerson.value = { name: '', email: '', comment: '', imageUrl: '', role: '' };
  isEditing.value = false;
  editingIndex = -1;
};

const selectedPerson = ref(null);

const openCard = (person) => {
  selectedPerson.value = person;
};

const closeCard = () => {
  selectedPerson.value = null;
};

const closeForm = () => {
  isFormVisible.value = false;
};

// Fetch data when the component is mounted
onMounted(fetchData);
</script>
<style scoped>
.person-card {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
