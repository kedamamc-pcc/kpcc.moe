<script lang="ts">
  import {defineComponent, h} from 'vue'

  export default defineComponent({
    props: {
      msg: {
        type: String,
        required: true,
      },
    },

    setup (props) {
      return () => h('div', props.msg)
    }
  })
</script>
