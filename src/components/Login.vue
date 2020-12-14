<template>
<body>
  <div class="title-page text-center"><h1>Login</h1></div>
  <form method="post" class="align-middle">
    <div class="text-center">
      <img src="@/assets/logo.png" alt="Avatar">
    </div><br>

    <div class="d-flex justify-content-center">
      <input type="text" placeholder="Enter Username" name="uname" required autofocus>
    </div>
    <div class="d-flex justify-content-center">
      <input type="password" placeholder="Enter Password" name="psw" required>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit">Login</button>
    </div>
  </form>
</body>
</template>

<script>
export default {

}
</script>

<style>
body { padding-top: 70px; }
</style>
