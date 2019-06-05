<template>
    <header class="header-global">
        
            <base-nav class="navbar-main" transparent type="" effect="light" expand>
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
                        
                        <router-link to="/managerlogin" class="dropdown-item">Login</router-link>
                        <router-link to="/manageruser" class="dropdown-item">User Manage</router-link>
                        <router-link to="/managerpic" class="dropdown-item">Pic Manage</router-link>
                    </base-dropdown>
                </ul>
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
