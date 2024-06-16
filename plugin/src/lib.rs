use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn push(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["bun"])?
        .with_exec(vec!["pkgx", "+nodejs.org@18.20.2", "bun", "install"])?
        .with_exec(vec![
            "pkgx",
            "+nodejs.org@18.20.2",
            "bunx",
            "drizzle-kit",
            "push",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
