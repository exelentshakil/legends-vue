<script setup>
import { ref, onMounted, reactive } from "vue"
import axios from "axios"
import { useLegendsStore } from "@/stores/legends"

const name = ref("")
const legends = reactive({
  data: [],
  count: 0,
})
const legendsStore = useLegendsStore()

onMounted(async () => {
  const req = await axios.get(
    "https://randomuser.me/api/?results=6&gender=male"
  )
  const data = await req.data.results
  const count = data.length
  legends.data = data
  legends.count = count
  legendsStore.$patch({ legends: { data: data, count: count } })
})

const searchLegends = () => {
  legends.data = legendsStore.legends.data.filter((legend) =>
    legend.name.first.toLowerCase().includes(name.value.toLowerCase())
  )
}
</script>

<template>
  <main>
    <div class="page-header">
      <h1>
        Legends Are True! <span class="legend">{{ legends.count }}</span>
      </h1>
      <input
        @keyup="searchLegends"
        v-model="name"
        type="text"
        placeholder="Jim..."
      />
    </div>

    <div class="legends">
      <div v-for="legend in legends.data" class="legend">
        <div class="card">
          <div class="details">
            <div class="user_photo horizontal_center" id="user_photo">
              <a href="javascript:getNewUser();" class="refresh">New</a
              ><img :src="legend.picture.large" />
            </div>
            <p id="user_title">{{ legend.name.first }}</p>
            <p id="user_title">
              <a href="mailto:{{ legend.email }}">{{ legend.email }}</a>
            </p>
            <p id="user_title">
              {{ legend.location.city }}, {{ legend.location.country }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
