<template>
  <div class="loading-indicator">
    <div class="loading-indicator__spinner">
      <svg xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" width="280">
          <title>LOADING</title>
          <path fill="transparent" d="M243.2, 382.4c-74.8,
          0-135.5-60.7-135.5-135.5s60.7-135.5,135.5-135.5s135.5, 60.7, 135.5,
          135.5 S318, 382.4, 243.2, 382.4z" id="textcircle" />
          <text class="heading">
              <textPath xlink:href="#textcircle">
                    ● LOADING ● LOADING ● LOADING
              </textPath>
          </text>
      </svg>
    </div>
  </div>
</template>

<style lang="postcss">
.loading-indicator {
  background: rgba(0,0,0,.9);
  @apply fixed top-0 left-0 w-full h-full flex items-center justify-center z-50;

  text {
    font-size: 2.5em;
    fill: #ecc94b;
    margin: 0;
    padding: 0;
    animation: spin 5000ms linear infinite;
    transform-box: fill-box;
    transform-origin: center;
    letter-spacing: -2px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(360deg);
  },
  100% {
    transform: rotate(0);
  }
}
</style>
