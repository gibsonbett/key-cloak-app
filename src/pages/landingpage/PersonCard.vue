<!-- PersonCard.vue -->
<template>
  <div class="person-card" v-show="isVisible" @click.self="closeCard">
    <!-- Check if person is not null before accessing properties -->
    <div v-if="person">
      <!-- Card content -->
      <div class="card-content">
        <img :src="person.imageUrl" alt="" class="card-image" />
        <div class="card-details">
          <h3 class="card-name">{{ person.name }}</h3>
          <p class="card-role">{{ person.role }}</p>
          <p class="card-email">{{ person.email }}</p>
          <p class="card-comment">{{ person.comment }}</p>
        </div>
      </div>
      <!-- Close button -->
      <button @click.stop="closeCard" class="close-button">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: Object,
    isVisible: Boolean,
  },
  methods: {
    closeCard() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Add your styling for the card here */
.person-card {
  /* Styling for the overlay background */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.card-content {
  /* Styling for the card content */
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.card-image {
  /* Styling for the person's image */
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.card-name {
  /* Styling for the person's name */
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

/* Add more styling as needed */
</style>
