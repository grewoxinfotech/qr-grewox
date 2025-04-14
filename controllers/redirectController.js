import { findRedirectById, createRedirect } from '../models/Redirect.js';

export async function handleRedirect(req, res) {
  const id = req.params.id;
  const result = await findRedirectById(id);

  if (result?.target_url) {
    res.redirect(result.target_url);
  } else {
    res.status(404).send('Redirect link not found');
  }
}

export async function handleCreate(req, res) {
  const { target_url } = req.body;
  if (!target_url) return res.status(400).json({ error: 'Target URL is required' });

  const id = await createRedirect(target_url);
  const fullUrl = `http://localhost:${process.env.PORT || 3000}/dynamic/${id}`;
  res.status(201).json({ id, redirect_url: fullUrl });
}
