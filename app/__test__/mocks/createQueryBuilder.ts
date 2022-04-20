export const mockCreateQueryBuilder = (data: any, isRaw?: boolean): any => {
    let createQueryBuilder: any = {
        select: () => createQueryBuilder,
        innerJoin: () => createQueryBuilder,
        leftJoinAndSelect: () => createQueryBuilder,
        innerJoinAndSelect: () => createQueryBuilder,
        leftJoinAndMapMany: () => createQueryBuilder,
        leftJoinAndMapOne: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        andWhere: () => createQueryBuilder,
        where: () => createQueryBuilder,
        findOneOrFail: () => createQueryBuilder,
        getCount: () => data
    }

    if (Array.isArray(data)) {
        if (isRaw) {
            createQueryBuilder.getRawMany = () => data
            return createQueryBuilder
        }
        createQueryBuilder.getMany = () => data
        return createQueryBuilder
    } else if (typeof data === 'object') {
        if (isRaw) {
            createQueryBuilder.getRawOne = () => data
            return createQueryBuilder
        }
        createQueryBuilder.getOne = () => data
        return createQueryBuilder
    } else {
        return createQueryBuilder
    }
}

export const mockConnectionRepoFinder = (data: any, isRaw?: boolean): any => {
    let connectionRepoFinder: any = {
        getConnection: () => connectionRepoFinder,
        getRepository: () => connectionRepoFinder,
        LessThan: () => connectionRepoFinder,
        MoreThan: () => connectionRepoFinder,
        find: () => data,
    }
}

export const mockCQBForUpdateAndDelete = () => {
    let createQueryBuilder: any = {
        update: () => createQueryBuilder,
        set: () => createQueryBuilder,
        execute: () => createQueryBuilder,
        where: () => createQueryBuilder,
    }

    return createQueryBuilder
}
