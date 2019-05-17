<template>
    <header class="header-global">
        <div style="position: relative">
            <base-nav class="navbar-main" type="success" effect="light" expand>
                <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                    <img src="img/brand/logo.png" alt="logo">
                </router-link>
                <a class="navbar-brand" href="#"></a>
                <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-collection d-lg-none"></i>
                        <span class="nav-link-inner--text">MENU</span>
                    </a>
                    <router-link to="/" class="dropdown-item">Main</router-link>
                    <router-link to="/login" class="dropdown-item">Login</router-link>
                    <router-link to="/register" class="dropdown-item">Register</router-link>
                </base-dropdown>
                </ul>

                <div class="row" slot="content-header" slot-scope="{closeMenu}">
                    <div class="col-6 collapse-brand">
                        <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                            <img src="https://demos.creative-tim.com/vue-argon-design-system/img/brand/blue.png">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <close-button @click="closeMenu"></close-button>
                    </div>
                </div>

                <ul class="navbar-nav ml-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" href="#">
                            Discover
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-link-icon" href="#">
                            Profile
                        </a>
                    </li>
                    <base-dropdown tag="li" title="Settings">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                    </base-dropdown>
                </ul>
            </base-nav>
        </div>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
