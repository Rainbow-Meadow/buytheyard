Replace the fourth stat in the homepage stats strip.

**Change in `src/routes/index.tsx`** (line 394):

- Remove: `{ k: "1 yard", v: "Minimum order size" }`
- Add: `{ k: "5★", v: "Google & Facebook rated" }`

No other changes. The existing `stat-shine` shimmer + glow treatment applies automatically to the new value.
