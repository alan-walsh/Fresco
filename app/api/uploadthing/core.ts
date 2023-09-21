import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  protocolUploader: f({
    'application/zip': { maxFileSize: '256MB', maxFileCount: 5 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const session = 'mock session';
      console.log('🚀 ~ file: core.ts:15 ~ .middleware ~ session:', session);
      // if (!session?.user.id) {
      //   throw new Error('Unauthorized');
      // }
      return {};
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
