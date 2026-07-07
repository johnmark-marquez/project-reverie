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

function startDrain() {
  if (draining) {
    return;
  }

  draining = true;

  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(drainQueue, { timeout: 120 });
  } else {
    window.setTimeout(drainQueue, 0);
  }
}

/** Run heavy wash paints one at a time; hero paints immediately. */
export function scheduleWashPaint(job: PaintJob, priority: "high" | "low" = "low") {
  if (priority === "high" && !draining && queue.length === 0) {
    job();
    return;
  }

  if (priority === "high") {
    queue.unshift(job);
  } else {
    queue.push(job);
  }

  if (priority === "high" && draining) {
    return;
  }

  if (priority === "high") {
    window.requestAnimationFrame(() => {
      if (!draining) {
        startDrain();
      }
    });
    return;
  }

  startDrain();
}
