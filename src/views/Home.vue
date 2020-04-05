<template>
    <loading-indicator v-if="!isLoaded" />
    <div class="home" v-else>
        <section class="films">
            <ul class="films__timeline flex flex-col w-full m-auto">
                <li
                    v-for="film in sortedFilmsChronologically"
                    :key="film.episode_id"
                    @click="viewDetails(film.episode_id)"
                    class="film heading w-1/2 my-32"
                >
                    <h2 class="film__title">
                        {{ film.title.toUpperCase() }}
                    </h2>
                    <span class="film__release text-xl text-white">{{ film.release_date | moment("Y") }}</span>
                    <span class="film__episode serif">{{ film.episode_id | toRomanNumeral}}</span>
                </li>
            </ul>
            <div class="films__line" />
        </section>
    </div>
</template>

<script>
import LoadingIndicator from "../components/LoadingIndicator.vue"

export default {
  components: { LoadingIndicator },
  filters: {
    toRomanNumeral (value) {
      const numbers = new Map([
        [1, "I"],
        [2, "II"],
        [3, "III"],
        [4, "IV"],
        [5, "V"],
        [6, "VI"],
        [7, "VII"],
        [8, "VIII"],
        [9, "IX"]
      ])

      return numbers.get(value)
    }
  },
  data () {
    return {
      films: [],
      isLoaded: false
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
      this.isLoaded = false
      this.$swapi
        .get("films")
        .then(({ data }) => {
          this.films = data.results
        })
        .finally(() => {
          this.isLoaded = true
        })
    },
    viewDetails (id) {
      if (id) {
        this.$router.push({
          name: "Film",
          params: {
            episodeId: id,
            movie: this.films.find(film => film.episode_id === +id),
            sequel: this.films.find(film => film.episode_id === id + 1)
          }
        })
      }
    }
  }
}
</script>

<style lang="postcss">
.films {
  position: relative;

    &__line {
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

    &__timeline {
        @apply overflow-hidden;
        .film {
            cursor: pointer;
            @apply relative px-6;

            > * {
                z-index: 1;
                position: relative;
            }

            &__title {
                font-size: 3vw;
                transition: 100ms color ease-in;
                @apply text-yellow-500 leading-tight;
            }

            &__episode {
              font-weight: bolder;
              color: rgba(0,0,0,.95);
              text-shadow: 0 0 10px rgba(255, 255, 255, .5);
              font-size: 15vw;
              line-height: 0;
              top: 50%;
              left: 2rem;
              transform: translateY(-50%);
              z-index: 0;
              transition: 100ms color ease-in;
              @apply absolute;
            }

            &:nth-child(odd) {
                @apply pr-24 text-right;
                transform: perspective(100px) rotateX(5deg) rotateY(2deg);

                .film__episode {
                    right: 2rem;
                }
            }

            &:nth-child(even) {
                @apply pl-24 ml-auto;
                transform: perspective(100px) rotateX(5deg) rotateY(-2deg);
            }

            &:hover {
              .film__title {
                color: #FFF;
              }

              .film__episode {
                @apply text-yellow-500;
              }
            }
        }
    }
}
</style>
