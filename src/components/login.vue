<template>
<div>
<div class="container">
<div class="row">
<div class="col s12 m8 offset-m2">
<div class="login card-panel red lighten-5 white-text center">
<span class="blue-text text-darken-2"><h4>FoodCenter</h4></span>
<form>
<div class="input-field">
<input type="text" id="user">
<label for="user">Username</label>
</div>
<div class="input-field">
<input type="password" id="password">
<label for="password">Password</label>
</div>
<button class="btn btn-large grey lighten-4 black-text">Login To FoodCenter</button>
</form>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {

    }
  }
}
</script>
