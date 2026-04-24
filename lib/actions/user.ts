'use server';

import prisma from '@/lib/prisma';

export const getUids = async () => {
  try {
    const assets = await prisma.asset.findMany();

    const userIds = new Set();
    for (const asset of assets) {
      const userId = asset.uid;
      userIds.add(userId);
    }
    const uids = Array.from(userIds);

    return uids;
  } catch (error) {
    return { error: 'Failed to fetch uids' };
  }
};

export const updateUserName = async (userId: string | number, newName: string) => {
  try {
    const id = typeof userId === 'string' ? parseInt(userId) : userId;
    
    await prisma.user.update({
      where: { id },
      data: { firstName: newName },
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user name:', error);
    return { error: 'Failed to update user name' };
  }
};

export const signUp = async (email: string, password: string, name?: string) => {
  try {
    const bcrypt = await import('bcrypt');
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        uid: Math.random().toString(36).substring(2, 15), // Generate a random uid for legacy support
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Error signing up:', error);
    return { error: 'Failed to create account' };
  }
};
