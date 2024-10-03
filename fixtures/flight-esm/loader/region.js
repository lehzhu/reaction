import {
  resolve,
  load as reactionLoad,
  getSource as getSourceImpl,
  transformSource as reactionTransformSource,
} from 'reaction-server-dom-esm/node-loader';

export {resolve};

async function textLoad(url, context, defaultLoad) {
  const {format} = context;
  const result = await defaultLoad(url, context, defaultLoad);
  if (result.format === 'module') {
    if (typeof result.source === 'string') {
      return result;
    }
    return {
      source: Buffer.from(result.source).toString('utf8'),
      format: 'module',
    };
  }
  return result;
}

export async function load(url, context, defaultLoad) {
  return await reactionLoad(url, context, (u, c) => {
    return textLoad(u, c, defaultLoad);
  });
}

async function textTransformSource(source, context, defaultTransformSource) {
  const {format} = context;
  if (format === 'module') {
    if (typeof source === 'string') {
      return {source};
    }
    return {
      source: Buffer.from(source).toString('utf8'),
    };
  }
  return defaultTransformSource(source, context, defaultTransformSource);
}

async function transformSourceImpl(source, context, defaultTransformSource) {
  return await reactionTransformSource(source, context, (s, c) => {
    return textTransformSource(s, c, defaultTransformSource);
  });
}

export const transformSource =
  process.version < 'v16' ? transformSourceImpl : undefined;
export const getSource = process.version < 'v16' ? getSourceImpl : undefined;
