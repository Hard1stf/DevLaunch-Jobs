import { describe, it, expect } from 'vitest';
import { updateProfileSchema } from '../../validators/user.validator.js';

describe('updateProfileSchema', () => {
  it('should accept the valid skills', () => {
    const result = updateProfileSchema.safeParse({
      skills: ['React', 'Node.js', 'TypeScript'],
    });

    expect(result.success).toBe(true);
  });

  it('should trim whitespace around skills', () => {
    const result = updateProfileSchema.safeParse({
      skills: [' React ', ' Node.js '],
    });

    expect(result.success).toBe(true);

    if (result.success)
      expect(result.data.skills).toEqual(['React', 'Node.js']);
  });

  it('should reject empty skills', () => {
    const result = updateProfileSchema.safeParse({ skills: ['React', ''] });

    expect(result.success).toBe(false);
  });

  it('should reject whitespace-only skills', () => {
    const result = updateProfileSchema.safeParse({ skills: ['   '] });

    expect(result.success).toBe(false);
  });

  it('should reject duplicate skills', () => {
    const result = updateProfileSchema.safeParse({
      skills: ['React', 'React'],
    });

    expect(result.success).toBe(false);
  });

  it('should reject duplicates regardless of letter case', () => {
    const result = updateProfileSchema.safeParse({
      skills: ['React', 'react'],
    });

    expect(result.success).toBe(false);
  });

  it('should allow empty skills array', () => {
    const result = updateProfileSchema.safeParse({ skills: [] });

    expect(result.success).toBe(true);
  });

  it('should allow omitted skills when another profile field is provided', () => {
    const result = updateProfileSchema.safeParse({ bio: 'Frontend developer' });

    expect(result.success).toBe(true);
  });

  it('should reject empty profile update', () => {
    const result = updateProfileSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
