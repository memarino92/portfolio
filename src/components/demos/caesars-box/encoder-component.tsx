import { useState } from 'preact/hooks';
import { encoder } from './_encoder';

export default function EncoderComponent() {
  const [message, setMessage] = useState('HELLO INTERNET');
  return (
    <div class="article-demo">
      <label for="caesar-message">Try it: enter a message</label>
      <textarea id="caesar-message" rows={3} maxLength={10000} value={message}
        onInput={event => setMessage(event.currentTarget.value)} />
      <p class="label">Encoded message</p>
      <output for="caesar-message" aria-live="polite" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{encoder(message)}</output>
    </div>
  );
}
