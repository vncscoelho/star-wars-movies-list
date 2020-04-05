<template>
  <loading-indicator v-if="!isLoaded" key="0"  />
  <section v-else key="1" class="film-detail-modal w-full md:p-12 sm:p-0">
      <div class="film-detail-modal__wrapper md:rounded-md sm:rounded-none bg-white w-full h-full relative overflow-hidden">
        <!-- Back button -->
        <router-link to="/" class="heading absolute top-0 left-0 z-20 px-4 py-4 font-bold rounded-br bg-yellow-500 text-yellow-800 hover:bg-yellow-400">
          BACK
        </router-link>
        <!-- Header -->
        <header class="film-detail-modal__header relative flex flex-col items-center justify-center w-full overflow-hidden bg-black">
          <div class="film-detail-modal__info py-24 flex flex-col items-center justify-center z-10">
            <span class="heading text-yellow-500">STAR WARS</span>
            <h2 class="film-detail-modal__title text-white heading uppercase text-center leading-none my-4">{{this.current.title}}</h2>
            <p class="film-detail-modal__opening my-12 text-xl md:w-1/2 w-full md:p-0 px-4 text-yellow-500">
              {{this.current.opening_crawl}}
            </p>
          </div>
          <img :src="imgAPI + details.backdrop_path" alt="" v-if="details" class="object-cover absolute top-0 left-0 w-full h-full">
        </header>
        <!-- Movie production details -->
        <section class="film-detail-modal___production flex flex-wrap justify-start items-start">
          <!-- Trailer and Poster column -->
          <aside class="film-detail-modal___media -mt-12 md:w-1/2 sm:w-full relative z-10">
            <div class="p-8 bg-yellow-500">
              <h3 class="heading text-gray-900 mb-4">TRAILER</h3>
              <iframe width="100%" height="280" :src="`https://www.youtube.com/embed/${details.trailer.key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="p-8">
              <h3 class="heading mb-4 mt-6 text-yellow-500">POSTER</h3>
              <img :src="imgAPI + details.poster_path" alt="Poster" class="w-full">
            </div>
          </aside>
          <!-- Production team -->
          <div class="md:w-1/2 sm:w-full p-8">
            <h3 class="heading text-gray-900 mb-4 text-yellow-500">MOVIE INFO</h3>
            <ul class="flex justify-between mb-6">
              <li>
                <strong>Directed by</strong>
                <p> {{this.current.director}}</p>
              </li>
              <li>
                <strong>Produced by</strong>
                <p> {{this.current.producer}}</p>
              </li>
            </ul>
            <!-- Cast -->
            <h3 class="heading text-gray-900 mb-4 text-yellow-500">Cast</h3>
            <ul>
              <li v-for="person in details.cast.splice(0,10)" :key="person.id" class="flex py-4 items-center">
                <div class="w-16 rounded-full h-16 overflow-hidden flex items-center">
                  <img :src="imgAPI + person.profile_path" :alt="person.name">
                </div>
                <div class="w-2/3 pl-4">
                  <h4 class="font-bold">{{person.name}}</h4>
                  as <span class="heading uppercase text-orange-500">{{person.character}}</span>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <!-- Link to sequel -->
        <section class="film-detail-modal__meta p-8 bg-yellow-500 w-full text-white text-center" v-if="sequel">
            <h3 class="heading center">FOLLLOWED BY</h3>
            <router-link :to="`/film/${sequel.episode_id}`" class="text-3xl heading text-black underline">
              {{sequel.title}}
            </router-link>
        </section>
      </div>
  </section>
</template>

<script>
import LoadingIndicator from "@/components/LoadingIndicator.vue"

export default {
  components: {
    LoadingIndicator
  },
  props: {
    episodeId: {
      type: [String, Number],
      required: true
    },
    movie: {
      type: Object,
      default: null
    },
    sequel: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      details: null,
      isLoaded: false,
      current: null
    }
  },
  computed: {
    imgAPI () {
      return "https://image.tmdb.org/t/p/original"
    }
  },
  created () {
    this.fetchMovieDetails()
  },
  methods: {
    async fetchMovieDetails () {
      this.isLoaded = false
      this.current = this.movie

      /* If the movie isn't available by props */
      /* TODO - Could be improved by using Vuex */
      if (!this.current) {
        await this.$swapi
          .get(`films/${this.episodeId}`)
          .then(({ data }) => {
            this.current = data
          })
      }

      /* Search for the current film */
      await this.$tmdb.get(`search/movie?query=Star+Wars+${this.current.title}`)
        .then(({ data }) => {
          this.details = data.results[0]
        })

      /* Shortener for ID */
      const { id } = this.details

      /* Get trailer */
      await this.$tmdb.get(`movie/${id}/videos`)
        .then(({ data }) => {
          this.details.trailer = data.results[0]
        })

      /* Get people info */
      await this.$tmdb.get(`movie/${id}/credits`)
        .then(({ data }) => {
          this.details.cast = data.cast
        })

      this.isLoaded = true
    }
  }
}
</script>

<style lang="postcss">
.film-detail-modal {
  &__header {
    min-height: 24em;
  }

  &__info {
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.9), black);
  }

  &__title {
    font-size: 4em;

    @media (max-width: 640px) {
      font-size: 2em;
    }
  }

  &__opening {
    transform: perspective(10em) rotateX(10deg);

    @media (max-width: 640px) {
      transform: none;
    }
  }
}
</style>
