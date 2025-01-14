"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";
import { client, clientNoCache } from "@/sanity/lib/client";
import { CATEGORY_BY_ID_QUERY, CONSTRUCTION_BY_SLUG_QUERY, PROJECT_BY_SLUG_QUERY, PROJECT_DETAIL_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { v4 as uuidv4 } from 'uuid';
import { Author } from "@/sanity/types";

export const createPitch = async (state: any, form: FormData, pitch: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch
    }

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const createConstruction = async (state: any, form: FormData, pitch: string,) => {
  const session = await auth();

  console.log('createConstruction -> session', session)

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { _id, title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const construction = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch
    }

    const result = await writeClient.create({ _type: "construction", ...construction });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const updateConstruction = async (state: any, form: FormData, pitch: string, _id: string) => {
  const session = await auth();

  console.log('updateConstruction -> session', session)

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(CONSTRUCTION_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const construction = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch
    }

    const result = await writeClient.patch(_id)
      .set({ ...construction })
      .commit()

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}


export const createProject = async (state: any, form: FormData, pitch: string, constructionId: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      construction: {
        _type: "reference",
        _ref: constructionId,
      },
      pitch
    }

    const result = await writeClient.create({ _type: "project", ...projectData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const updateProject = async (state: any, form: FormData, pitch: string, constructionId: string, _id: string) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      construction: {
        _type: "reference",
        _ref: constructionId,
      },
      pitch
    }


    const result = await writeClient.patch(_id)
      .set({ ...projectData })
      .commit()

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}


export const createProjectDetail = async (state: any, form: FormData, pitch: string, projectId: string,) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectDetailData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      project: {
        _type: "reference",
        _ref: projectId,
      },
      pitch
    }

    const result = await writeClient.create({ _type: "projectDetail", ...projectDetailData });

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const updateProjectDetail = async (state: any, form: FormData, pitch: string, projectId: string, _id: string) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { title, subtitle, description, thumbnail, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  );

  const baseSlug = slugify(title as string, { lower: true, strict: true });
  let uniqueSlug = baseSlug;

  const resultQuery = await clientNoCache.fetch(PROJECT_DETAIL_BY_SLUG_QUERY, { slug: baseSlug });

  console.log(resultQuery);

  if (resultQuery?.data) {
    uniqueSlug = `${baseSlug}-${resultQuery.data.length}`;
  }

  try {
    const projectDetailData = {
      title,
      subtitle,
      description,
      thumbnail,
      image,
      slug: {
        _type: uniqueSlug,
        current: uniqueSlug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      project: {
        _type: "reference",
        _ref: projectId,
      },
      pitch
    };


    const result = await writeClient.patch(_id)
      .set({ ...projectDetailData })
      .commit()

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });

  }
}

export const updateCategory = async (state: any, _id: string, projectId: string, isDelete: boolean = false) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  const { select: homeHeroPost } = await clientNoCache.fetch(CATEGORY_BY_ID_QUERY, { id: _id });

  console.log(homeHeroPost);

  try {

    if (isDelete) {
      const categorySelect = homeHeroPost
        .filter((item: any) => item._id !== projectId)
        .map((item: any) => ({ _type: "reference", _ref: item._id, _key: item._key || uuidv4() }));
      const categoryData = {
        select: [...categorySelect]
      }

      const result = await writeClient.patch(_id)
        .set({ ...categoryData })
        .commit()

      return parseServerActionResponse({
        result,
        error: "",
        status: "SUCCESS",
      })
    }

    const isExist = homeHeroPost.find((item: any) => item._id === projectId);

    if (isExist) {
      return parseServerActionResponse({
        error: "This item is already exist",
        status: "ERROR",
      })
    };

    const categorySelect = homeHeroPost.map((item: any) => ({ _type: "reference", _ref: item._id, _key: item._key || uuidv4() }));
    const categoryData = {
      select: [...categorySelect, { _type: "reference", _ref: projectId, _key: uuidv4() }]
    }

    const result = await writeClient.patch(_id)
      .set({ ...categoryData })
      .commit()

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}

export const deleteById = async (_id: string) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  try {
    const result = await writeClient.delete(_id);

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}

export const updateRoleByAdmin = async (post: Author) => {
  const session = await auth();

  if (!session) return parseServerActionResponse({
    error: "Not signed in",
    status: "ERROR"
  });

  try {
    const result = await writeClient.patch(post._id)
      .set({ ...post })
      .commit()

    return parseServerActionResponse({
      result,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
}