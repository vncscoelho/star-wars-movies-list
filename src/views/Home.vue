<template>
    <div class="home">
        <div class="films">
            <ul class="films-timeline flex flex-col w-full m-auto">
                <li
                    v-for="film in sortedFilmsChronologically"
                    :key="film.episode_id"
                    class="film heading w-1/2 my-32"
                >
                    <h2 class="film__title">
                        {{ film.title.toUpperCase() }}
                    </h2>
                    <span class="film__release text-xl">{{ film.release_date | moment("Y") }}</span>
                    <span class="film__episode">{{ film.episode_id }}</span>
                </li>
            </ul>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      films: [],
      isLoading: true
    }
  },
  computed: {
    sortedFilmsChronologically () {
      const films = [...this.films]
      return films.sort((a, b) =>
        new Date(a.release_date) > new Date(b.release_date) ? 1 : -1
      )
    }
  },
  created () {
    this.fetchFilms()
  },
  methods: {
    fetchFilms () {
      this.toggleLoading()
      this.$swapi
        .get("films")
        .then(({ data }) => {
          this.films = data.results
        })
        .finally(() => this.toggleLoading())
    },
    toggleLoading () {
      this.isLoading = !this.isLoading
    }
  }
}
</script>

<style lang="postcss">
.films {
  position: relative;

    .line {
        height: 100%;
        width: 2px;
        background: linear-gradient(45deg, #333, #eee, #333);
        border-radius: 50%;
        -webkit-transform: rotateX(5deg) translateX(-50%);
        transform: rotateX(5deg) translateX(-50%);
        top: 0;
        position: absolute;
        left: 50%;
        box-shadow: 0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 1);
    }

    .films-timeline {
        .film {
            @apply relative px-6;

            > * {
                z-index: 1;
                position: relative;
            }

            &__title {
                font-size: 3vw;
                @apply text-yellow-500 leading-tight;
            }

            &__episode {
                font-size: 15vw;
                line-height: 0;
                top: 50%;
                left: 2rem;
                transform: translateY(-50%);
                z-index: 0;
                opacity: 0.25;
                @apply absolute;
            }

            &:nth-child(odd) {
                @apply pr-24 text-right;

                .film__episode {
                    right: 2rem;
                }
            }
            &:nth-child(even) {
                @apply pl-24 ml-auto;
            }
        }
    }
}
</style>
