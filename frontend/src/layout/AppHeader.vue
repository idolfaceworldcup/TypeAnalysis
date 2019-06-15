<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img :src="require('../../public/img/brand/logo.png')" alt="logo">
      </router-link>
      <a class="navbar-brand" href="#"></a>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">MENU</span>
          </a>
          <router-link to="/" class="dropdown-item">Main</router-link>
          <router-link to="/login" class="dropdown-item" v-if="user.id === 0">Login</router-link>
          <router-link to="/register" class="dropdown-item" v-if="user.id === 0">Register</router-link>
          <router-link to="/modify" class="dropdown-item" v-if="user.id !== 0">Modify</router-link>
          <router-link to="/typeanalysis" class="dropdown-item">TypeAnalysis</router-link>
        </base-dropdown>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import axios from "axios";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },

  data() {
    return {
      user: {
        id: 0,
        name: "Guest"
      }
    };
  },

  methods: {
    authentication: function() {
      axios
        .get("http://localhost:3000/api/auth/exist")
        .then(response => {
          if (
            response.data.id !== undefined &&
            response.data.authority === undefined
          ) {
            this.user.name = response.data.loginId;
            this.user.id = response.data.id;
          }
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.authentication();
  }
};
</script>
<style>
</style>
