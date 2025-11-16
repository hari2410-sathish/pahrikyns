import React from 'react'


export default function ThemeToggle({ theme, setTheme }) {
const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')
return (
<button onClick={toggle} className="p-2 rounded-md border" aria-label="Toggle theme">
{theme === 'dark' ? 'Light' : 'Dark'}
</button>
)
}