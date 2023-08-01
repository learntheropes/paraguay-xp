<script setup>
import * as faceapi from 'face-api.js';

definePageMeta({
  layout: 'empty'
});

const images = ref([])

onMounted(async () => {
  const canvas = document.getElementById("canvas")

  const browse  = document.getElementById('browse');

  browse.addEventListener('change', event => {

    const files = event.target.files;

    for (const file of files) {

      const image = new Image();
      image.src = window.URL.createObjectURL(file);

      image.onload = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/faceApi/tiny_face_detector_model-weights_manifest.json');
        const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions());

        let ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0,0, canvas.width, canvas.height); 

        detections.forEach(detection => {

          let box = {
            spread: 10,
            x: parseInt(detection.box.x.toString()),
            y: parseInt(detection.box.y.toString()),
            width: parseInt(detection.box.width.toString()),
            height: parseInt(detection.box.height.toString())
          }

          ctx.filter = 'blur('+ box.spread +'px)';
          ctx.drawImage(canvas, box.x, box.y, box.width, box.height, box.x, box.y, box.width, box.height);
          ctx.filter = 'none';
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.fillRect(box.x, box.y, box.width, box.height);

          function draw(txt) {
            ctx.translate(- canvas.width, 0);
            ctx.rotate( - Math.PI / 4);
            ctx.font = "20px Arial";
            ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
            var txtHeight = 25;
            var offset = 25;
            var w = Math.ceil(ctx.measureText(txt).width);
            var txt = new Array(w * 10).join(txt + '     ');
            for (var i = 0; i < Math.ceil(canvas.height * 2 / txtHeight); i++) {
              ctx.fillText(txt, -(i * offset), i * txtHeight);
            }
          }

          draw('Paraguay XP');
        })
        images.value.push(canvas.toDataURL());
      }
    }
  })
})
</script>

<template>
  <div class="container">
    <section class="section">
      <input id="browse" type="file" multiple>
    </section>
  </div>
  <canvas id="canvas" class="is-hiiden-tablet is-hidden-mobile"/>
  <img v-for="image of images" :key="image" :src="image">
</template>
