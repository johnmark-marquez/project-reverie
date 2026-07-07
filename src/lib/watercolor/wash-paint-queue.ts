type PaintJob = () => void;

const queue: PaintJob[] = [];
let draining = false;

function drainQueue() {
  const job = queue.shift();

  if (!job) {
    draining = false;
    return;
  }

  job();

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(drainQueue, { timeout: 80 });
  } else {
    window.setTimeout(drainQueue, 0);
  }
}

/** Run heavy wash paints one at a time during idle time. */
export function scheduleWashPaint(job: PaintJob, priority: "high" | "low" = "low") {
  if (priority === "high") {
    queue.unshift(job);
  } else {
    queue.push(job);
  }

  if (draining) {
    return;
  }

  draining = true;

  if (priority === "high" && queue.length === 1) {
    window.requestAnimationFrame(drainQueue);
    return;
  }

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(drainQueue, { timeout: 120 });
  } else {
    window.setTimeout(drainQueue, 0);
  }
}
