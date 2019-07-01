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
  min-height: 100vh;
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
    font-family: 'Prompt', sans-serif;
}
input[type=text], select {
    font-size: 17px;
    width: 100%;
    padding: 1% 1%;
    /* padding-right: 2.25em; */
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
}
.button {
    -webkit-transition-duration: 0.4s;
    transition-duration: 0.4s;
    cursor: pointer;
}
.button:hover {
    /* color: white; */
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
    color: #363636;
}
.button2-invert {
    font-size: 15px;
    margin-top: 7px;
    background-color: white;
    color: #363636;
}
.button2-invert:hover {
    border: 2px solid #008CBA;
    background-color: #008CBA;
    color: white;
}
.button3 {
    border: 1px solid #a5a5a5;
    background-color: transparent;
    color: #a5a5a5;
}
.button3:hover, .button3:focus {
    border: none;
    background-color: #f44336;
    color: white;
}
.button3-white {
    border: 2px solid white;
    background-color: transparent;
    color: white;
}
.button3-white:hover, .button3-white:focus {
    border: none;
    background-color: #f44336;
    color: white;
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
    color: #363636;
}
.button5 {
    font-size: 15px;
    margin-top: 7px;
    background-color: #7FFF00;
    color: #363636;
    border: 2px solid #7FFF00;
}
.button5:hover {
    background-color: white;
    color: #363636;
}
.button6 {
    margin-top: 7px;
    background-color: #00FFFA;
    border: 2px solid #00FFFA;
    color: white;
}
.button6:hover {
    color: #363636;
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
    color: #363636;
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
    color: #363636
}
.button9 {
    font-size: 20px;
    margin-right: 20px;
    background-color: #ffdd57;
    border: 2px solid #ffdd57;
    color: #363636;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button9:hover {
    background-color: #B8860B;
}
.button10 {
    margin-top: 7px;
}
.button11 {
    font-size: 18px;
    margin-top: 8px;
    background-color: white;
    color: #363636;
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
    color: #363636;
    border: 2px solid #008CBA;
}
.button12:hover {
    background-color: #0d92be;
    color: white;
}
.button13 {
    border: 1px solid #a5a5a5;
    background-color: transparent;
    color: #a5a5a5;
}
.button13:hover, .button3:focus {
    border: none;
    background-color: #ffdd57;
    color: white;
}
.button13-white {
    border: 2px solid white;
    background-color: transparent;
    color: white;
}
.button13-white:hover, .button3-white:focus {
    border: none;
    background-color: #ffdd57;
    color: white;
}
hr {
    width: 100%;
}
.card {
    background: #ffffff;
    margin: 20px;
    border-radius: 20px;
    padding: 20px 10px;
    border: none;
    box-shadow: none;
  }
button .icon {
    margin-right: 5px!important;
}
.overflow-y{
    overflow-y:scroll;
}
 .overflow-y::-webkit-scrollbar-track
 {
     -webkit-box-shadow: inset 0 0 6px rgba(121, 121, 121, 0.3);
     border-radius: 8px;
     background-color: #F5F5F5;
 }

 .overflow-y::-webkit-scrollbar
 {
     width: 8px;
     background-color: #F5F5F5;
 }
 .overflow-y::-webkit-scrollbar-thumb
 {
     border-radius: 8px;
     -webkit-box-shadow: inset 0 0 6px rgba(121, 121, 121, 0.3);
     background-color: rgb(185, 185, 185);
 }
 .m-0 {
  margin: 0 !important;
}

.mt-0,
.my-0 {
  margin-top: 0 !important;
}

.mr-0,
.mx-0 {
  margin-right: 0 !important;
}

.mb-0,
.my-0 {
  margin-bottom: 0 !important;
}

.ml-0,
.mx-0 {
  margin-left: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.mt-1,
.my-1 {
  margin-top: 0.25rem !important;
}

.mr-1,
.mx-1 {
  margin-right: 0.25rem !important;
}

.mb-1,
.my-1 {
  margin-bottom: 0.25rem !important;
}

.ml-1,
.mx-1 {
  margin-left: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.mt-2,
.my-2 {
  margin-top: 0.5rem !important;
}

.mr-2,
.mx-2 {
  margin-right: 0.5rem !important;
}

.mb-2,
.my-2 {
  margin-bottom: 0.5rem !important;
}

.ml-2,
.mx-2 {
  margin-left: 0.5rem !important;
}

.m-3 {
  margin: 1rem !important;
}

.mt-3,
.my-3 {
  margin-top: 1rem !important;
}

.mr-3,
.mx-3 {
  margin-right: 1rem !important;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.ml-3,
.mx-3 {
  margin-left: 1rem !important;
}

.m-4 {
  margin: 1.5rem !important;
}

.mt-4,
.my-4 {
  margin-top: 1.5rem !important;
}

.mr-4,
.mx-4 {
  margin-right: 1.5rem !important;
}

.mb-4,
.my-4 {
  margin-bottom: 1.5rem !important;
}

.ml-4,
.mx-4 {
  margin-left: 1.5rem !important;
}

.m-5 {
  margin: 3rem !important;
}

.mt-5,
.my-5 {
  margin-top: 3rem !important;
}

.mr-5,
.mx-5 {
  margin-right: 3rem !important;
}

.mb-5,
.my-5 {
  margin-bottom: 3rem !important;
}

.ml-5,
.mx-5 {
  margin-left: 3rem !important;
}

.p-0 {
  padding: 0 !important;
}

.pt-0,
.py-0 {
  padding-top: 0 !important;
}

.pr-0,
.px-0 {
  padding-right: 0 !important;
}

.pb-0,
.py-0 {
  padding-bottom: 0 !important;
}

.pl-0,
.px-0 {
  padding-left: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.pt-1,
.py-1 {
  padding-top: 0.25rem !important;
}

.pr-1,
.px-1 {
  padding-right: 0.25rem !important;
}

.pb-1,
.py-1 {
  padding-bottom: 0.25rem !important;
}

.pl-1,
.px-1 {
  padding-left: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.pt-2,
.py-2 {
  padding-top: 0.5rem !important;
}

.pr-2,
.px-2 {
  padding-right: 0.5rem !important;
}

.pb-2,
.py-2 {
  padding-bottom: 0.5rem !important;
}

.pl-2,
.px-2 {
  padding-left: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.pt-3,
.py-3 {
  padding-top: 1rem !important;
}

.pr-3,
.px-3 {
  padding-right: 1rem !important;
}

.pb-3,
.py-3 {
  padding-bottom: 1rem !important;
}

.pl-3,
.px-3 {
  padding-left: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.pt-4,
.py-4 {
  padding-top: 1.5rem !important;
}

.pr-4,
.px-4 {
  padding-right: 1.5rem !important;
}

.pb-4,
.py-4 {
  padding-bottom: 1.5rem !important;
}

.pl-4,
.px-4 {
  padding-left: 1.5rem !important;
}

.p-5 {
  padding: 3rem !important;
}

.pt-5,
.py-5 {
  padding-top: 3rem !important;
}

.pr-5,
.px-5 {
  padding-right: 3rem !important;
}

.pb-5,
.py-5 {
  padding-bottom: 3rem !important;
}

.pl-5,
.px-5 {
  padding-left: 3rem !important;
}
</style>
