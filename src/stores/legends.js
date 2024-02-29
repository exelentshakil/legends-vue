import { reactive, computed } from "vue"
import { defineStore } from "pinia"

export const useLegendsStore = defineStore("legends", () => {
  const legends = reactive({
    data: [],
    count: 0,
  })

  return { legends }
})
