import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Flip } from "gsap/Flip";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother, Flip);
});
