import {
  animation,
  trigger,
  animateChild,
  group,
  transition,
  animate,
  style,
  query,
  state,
} from "@angular/animations";
export const rotateIcon = trigger("rotateIcon", [
  state(
    "up",
    style({
      transform: "rotate(0deg)",
    })
  ),
  state("down", style({ transform: "rotate(180deg)" })),
  transition("up <=> down", animate("0.3s ease")),
]);
