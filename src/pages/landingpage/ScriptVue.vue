<!-- <script setup>
import { ref } from "vue";
const people = ref([
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Admin",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=3386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dries Martens",
    email: "michael.foster@example.com",
    role: "Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Manager",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=2364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Employee",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh1bWFufGVufDB8fDB8fHww",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Employee",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1682965699797-a2bd37f62b45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGh1bWFufGVufDB8fDB8fHww",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Employee",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]);

const newPerson = ref({ name: "", email: "", comment: "", imageUrl: "" });
const isEditing = ref(false);
let editingIndex = -1;

const userRole = ref("admin"); // Set the user role here

const isFormVisible = ref(false);

const toggleFormVisibility = () => {
  isFormVisible.value = !isFormVisible.value;
};

const addPerson = () => {
  // Add new person to the people array (visible only to admin and manager)
  if (userRole.value === "admin" || userRole.value === "manager") {
    people.value.push({ ...newPerson.value });
    // Clear the form fields
    clearForm();
  }
};

const editPerson = (person) => {
  // Edit functionality (visible only to admin and manager)
  if (userRole.value === "admin" || userRole.value === "manager") {
    newPerson.value = { ...person };
    isEditing.value = true;
    editingIndex = people.value.findIndex((p) => p.email === person.email);
    // Toggle form visibility when Edit button is clicked
    toggleFormVisibility();
  }
};

const updatePerson = () => {
  // Update functionality (visible only to admin and manager)
  if (userRole.value === "admin" || userRole.value === "manager") {
    people.value[editingIndex] = { ...newPerson.value };
    clearForm();
  }
};

const deletePerson = (person) => {
  // Delete functionality (visible only to admin)
  if (userRole.value === "admin") {
    const index = people.value.findIndex((p) => p.email === person.email);
    if (index !== -1) {
      people.value.splice(index, 1);
    }
  }
};

const clearForm = () => {
  newPerson.value = { name: "", email: "", comment: "", imageUrl: "" };
  isEditing.value = false;
  editingIndex = -1;
};

import PersonCard from "./PersonCard";

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
<script/> -->