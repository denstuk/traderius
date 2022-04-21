const msgPath = process.env.HUSKY_GIT_PARAMS
const msg = require('fs')
    .readFileSync(msgPath, 'utf-8')
    .trim()

const commitRE = /^Merge.+|(revert: )?(ci|chore|feat|improve|doc|build|perf|revert|style|fix|refactor|test)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
    console.error(
        `ERROR: Invalid commit message format.\n\n` +
            `Proper commit message format is required for automated changelog generation. Examples:\n\n` +
            `   feat(web): add new component <name>\n` +
            `See git/COMMIT_CONVENTION.md for more details.\n`
    )
    process.exit(1)
}
