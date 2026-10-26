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

  it('should reject empty profile text fields', () => {
    const invalidProfile = [
      { firstName: '' },
      { lastName: '' },
      { location: '' },
      { bio: '' },
    ];

    for (const profile of invalidProfile) {
      const result = updateProfileSchema.safeParse(profile);

      expect(result.success).toBe(false);
    }
  });

  it('should reject whitespace-only profile text fields', () => {
    const invalidProfile = [
      { firstName: '    ' },
      { lastName: '    ' },
      { location: '    ' },
      { bio: '   ' },
    ];

    for (const profile of invalidProfile) {
      const result = updateProfileSchema.safeParse(profile);

      expect(result.success).toBe(false);
    }
  });

  it('should trim whitespace around profile text fields', () => {
    const result = updateProfileSchema.safeParse({
      firstName: ' Hardik ',
      lastName: ' Vijeta ',
      location: ' Muzaffarpur ',
      bio: ' Frontend developer ',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Muzaffarpur',
        bio: 'Frontend developer',
      });
    }
  });

  it('should accept first and last names at the maximum length', () => {
    expect(
      updateProfileSchema.safeParse({ firstName: 'A'.repeat(50) }).success,
    ).toBe(true);

    expect(
      updateProfileSchema.safeParse({ lastName: 'A'.repeat(50) }).success,
    ).toBe(true);
  });

  it('should reject first and last names exceeding the maximum length', () => {
    expect(
      updateProfileSchema.safeParse({ firstName: 'A'.repeat(51) }).success,
    ).toBe(false);

    expect(
      updateProfileSchema.safeParse({ lastName: 'A'.repeat(51) }).success,
    ).toBe(false);
  });

  it('should accept location and bio at the maximum length', () => {
    expect(
      updateProfileSchema.safeParse({ location: 'A'.repeat(120) }).success,
    ).toBe(true);

    expect(
      updateProfileSchema.safeParse({ bio: 'A'.repeat(500) }).success,
    ).toBe(true);
  });

  it('should reject location and bio exceeding the maximum length', () => {
    expect(
      updateProfileSchema.safeParse({ location: 'A'.repeat(121) }).success,
    ).toBe(false);

    expect(
      updateProfileSchema.safeParse({ bio: 'A'.repeat(501) }).success,
    ).toBe(false);
  });
});
