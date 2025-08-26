<template>
  <canvas id="snow-canvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

class HookQueue {
  constructor() {
    this.hooks = [];
  }
  register(callback) {
    this.hooks.push(callback);
  }
  call(...args) {
    for (let i = 0, len = this.hooks.length; i < len; i++) {
      if (this.hooks[i](...args, new Date()) !== true) {
        break;
      }
    }
  }
}

class Engine {
  constructor() {
    this.raf = null;
    this.frames = 0;
    this.started = false;
    this.is_running = false;
    this.start_time = null;
    this.paused_frames = 0;
    this.fps = 60;

    this.onStart = new HookQueue();
    this.onRun = new HookQueue();
    this.onPause = new HookQueue();
    this.onUnpause = new HookQueue();
    this.onStop = new HookQueue();
  }

  get running_time() {
    return this.frames / this.fps;
  }
  get paused_time() {
    return this.paused_frames / this.fps;
  }

  start() {
    if (this.started) return;

    this.started = true;
    this.is_running = true;
    if (this.start_time === null) this.start_time = new Date();

    this.onStart.call(this);
    this.run();
  }

  pause() {
    if (!this.started) return;

    if (this.is_running) {
      this.is_running = false;
      this.onPause.call(this);
    } else {
      this.is_running = true;
      this.onUnpause.call(this);
    }
  }

  stop() {
    if (!this.started) return;

    this.started = false;
    this.is_running = false;
    window.cancelAnimationFrame(this.raf);
    this.raf = null;
    this.onStop.call(this);

    this.start_time = null;
    this.paused_frames = 0;
    this.frames = 0;
  }

  run() {
    let fpsInterval = 1000 / this.fps;
    const runFrame = () => {
      this.raf = window.requestAnimationFrame(runFrame);

      let now = new Date();
      let elapsed = now - this.start_time;

      if (elapsed > fpsInterval) {
        this.start_time = now - (elapsed % fpsInterval);

        if (this.is_running) {
          this.onRun.call(this);
          this.frames++;
        } else {
          this.paused_frames++;
        }
      }
    };
    runFrame();
  }
}

class SnowBackground {
  constructor(canvas, colour) {
    this.engine = new Engine();
    this.element = this.getElement(canvas);
    this.ctx = this.element.getContext("2d");
    this.calculateRect();

    window.addEventListener("resize", () => this.calculateRect());

    this.snow = [];
    this.colour = colour || "#FFFFFF";
    this.makeSheet(8);
  }

  get radius() {
    return 5;
  }

  makeSnowFlake(number = 1, radius = this.radius) {
    return Array.from({ length: number }, () => ({
      x: Math.round(Math.random() * (this.rect.width - radius * 2)),
      y: Math.round(Math.random() * (this.rect.height - radius * 2)),
      r: radius,
      s: Math.random() * 0.5 + 0.5,
      d: Math.random() < 0.5 ? -1 : 1,
    }));
  }

  makeSheet(number = 1) {
    Array.from({ length: number }, (_, key) => {
      this.snow.push({
        flakes: this.makeSnowFlake(20, this.radius * (1 - key / number)),
        colour: `rgba(255, 255, 255, ${1 - key / number})`,
      });
    });
  }

  animate() {
    this.engine.onRun.register(() => {
      this.clear();
      this.snow.forEach((sheet) => {
        sheet.flakes.forEach((snowflake) => {
          snowflake.y = snowflake.y + 2 * snowflake.s;
          snowflake.x =
            snowflake.x +
            Math.sin(this.engine.running_time) * 0.3 * snowflake.s * snowflake.d;

          if (snowflake.y > this.rect.height) {
            snowflake.y = -snowflake.r;
          }

          let opacity = 1;
          if (snowflake.y > window.innerHeight / 4) {
            opacity = 1 - snowflake.y / window.innerHeight;
          }
          opacity = Math.max(0, Math.min(1, opacity));

          this.drawCircle(snowflake, sheet.colour, opacity);
        });
      });
    });
    this.engine.start();
  }

  drawCircle(circle, colour, opacity) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = colour || this.colour;
    this.ctx.globalAlpha = opacity;
    this.ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI, true);

    if (circle.r > 4) {
      this.ctx.shadowColor = colour;
      this.ctx.shadowBlur = circle.r * 2.5;
    }
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.rect.width, this.rect.height);
  }

  getElement(element) {
    if (element instanceof HTMLElement) return element;
    return document.querySelector(element);
  }

  calculateRect() {
    let rect = this.element.getBoundingClientRect();
    this.element.width = rect.width;
    this.element.height = rect.height;

    if (this.rect) {
      this.snow.forEach((sheet) => {
        sheet.flakes.forEach((snowflake) => {
          snowflake.x = (snowflake.x / this.rect.width) * rect.width;
          snowflake.y = (snowflake.y / this.rect.height) * rect.height;
        });
      });
    }

    return (this.rect = Object.assign(rect, {
      center: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      },
    }));
  }
}

let backgroundInstance = null;

onMounted(() => {
  backgroundInstance = new SnowBackground("#snow-canvas");
  backgroundInstance.animate();
});

onBeforeUnmount(() => {
  if (backgroundInstance) {
    backgroundInstance.engine.stop();
    backgroundInstance = null;
  }
});
</script>

<style scoped>
canvas {
  display: block;
  background: var(--smoky-black);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* 确保背景在最底层 */
}
</style>
