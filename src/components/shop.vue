<template>
<div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
          <p class="menu-label">
            categories
          </p>
          <ul class="menu-list">
            <li class="is-right"><a href="#const" class="is-active"><i class=""></i> เมนูอาหารเเนะนำ</a></li>
            <li><a href="#let" class="is-active"><i class=""></i> เมนูอาหารทั่วไป</a></li>
          </ul>
            </aside>
          </div>
          <div class="column is-9">
            <div class="content is-medium">
          <h3 class="title is-3">ร้านอาหาร {{ this.selectShop.name }} </h3>
              <div class="box">
                <h4 id="const" class="title is-3">เมนูอาหารเเนะนำ</h4>
                <article class="message is-primary">
                  <span class="icon has-text-primary">
                  <i class="fab fa-hot"></i>
                  </span>
                  <div class="message-body">
                    Block-scoped. Cannot be re-assigned. Not immutable.
                  </div>
                </article>
              <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token string">'test'</span><span class="token punctuation">;</span></code></pre>
            </div>
            <div class="box">
              <h4 id="let" class="title is-3">เมนูอาหารทั่วไป</h4>
              <article class="message is-primary">
                <span class="icon has-text-primary">
                  <i class="fas fa-info-circle"></i>
                </span>
                <div class="message-body">
                  Block-scoped. Can be re-assigned.
                </div>
              </article>
            <pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></code></pre>
          </div>
      </div>
    </div>
  </div>
</div>
</section>
    </div>
</template>
<script>
export default {
  name: 'shop',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    }
  }
}
</script>
<style scoped>
</style>
