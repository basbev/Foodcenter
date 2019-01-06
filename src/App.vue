<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
body {
  font-family: 'Prompt', sans-serif;
  background-color: #f5f5f5;
}
input[type=number], select {
    width: 100%;
    font-size: 17px;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}
input[type=text], select {
    font-size: 17px;
    width: 100%;
    padding: 1% 1%;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
}
.button {
    background-color: rgb(37, 108, 175);
    border: none;
    color: white;
    text-align: center;
    /*text-decoration: none;*/
    /*font-size: 14px;*/
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
   /* cursor: pointer;*/
   font-family: 'Prompt', sans-serif;
}
.button:hover {
    color: white;
}
.button1 {
    margin-top: 7px;

    border: 2px solid #0DFF82;
    background-color: #0DFF82;
    color: white;
}
.button1:hover {
    background-color: white;
    border: 2px solid #0DFF82;
    color: #0DFF82;
}
.button2 {
    font-size: 15px;
    margin-top: 7px;

    border: 2px solid #008CBA;
    background-color: #008CBA;
    color: white;
}
.button2:hover {
    background-color: white;
    color: black;
}
.button3 {
    margin-top: 7px;
    color: white;
    border: 2px solid #f44336;
    background-color: #f44336;
}
.button3:hover {
    background-color: white;
    color: black;

}
.button4 {
    font-size: 15px;
    margin-top: 7px;
    background-color: #0063B0;
    border: 2px solid #0063B0;
    color: white;
}
.button4:hover {
    background-color: white;
    color: black;
}
.button5 {
    font-size: 15px;
    margin-top: 7px;
    background-color: #7FFF00;
    color: black;
    border: 2px solid #7FFF00;
}
.button5:hover {
    background-color: white;
    color: black;
}
.button6 {
    margin-top: 7px;
    background-color: #00FFFA;
    border: 2px solid #00FFFA;
    color: white;
}
.button6:hover {
    color: black;
    background-color: white;

}
.button7 {
    border: 2px solid #4CAF50;
    background-color: #4CAF50;
    color: white;
    height: 100%;
}
.button7:hover {
    border: 2px solid #4CAF50;
    background-color: white;
    color: black;
}
.button8 {
    color: white;
    background-color: #f44336;
    border: 2px solid #f44336;
    height: 100%;
}
.button8:hover {
    border: 2px solid #f44336;
    background-color: white;
    color: black
}
.button9 {
    font-size: 20px;
    margin-right: 20px;
    color: white;

}
.button9:hover {background-color: #B8860B;
}
.button10 {
    margin-top: 7px;
}
.button11 {
    font-size: 18px;
    margin-top: 8px;
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
}
.button11:hover {
    background-color: #4CAF50;
    color: white;
}
.button12 {
    font-size: 18px;
    margin-top: 8px;
    background-color: white;
    color: black;
    border: 2px solid #008CBA;
}
.button12:hover {
    background-color: #0d92be;
    color: white;
}
</style>
