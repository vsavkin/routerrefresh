# Page Refresh

By defautl the router does two things:

1. It skips any navigation to the current url
2. It doesn't rerun any resolvers or guards if params didn't change

To implement the refresh button we need to address both of them:

First we need to set `onSameUrlNavigation: 'reload'`, which will tell the router not to skip navigation to the current url. This however won't automatically rerun any resolvers or guards. We need to add `runGuardsAndResolvers: 'always'` or something similar to the appropriate router configuration node.

A few things to consider:

1. `CanActivateChild` will rerun if the child node has `runGuardsAndResolvers: 'always'`, not the parent node. Basically, the configuration of the child node is used when deciding how CanActivateChild works.
2. You can also use `CanActivate` to guard the child. You simply need to find the approprite route in the router state.

How to implement refresh:

1. If you only need to rerun a guard:

- you can add `runGuardsAndResolvers: 'always',` to the parent node and use `CanActivate`. It will run every time, so you redirect if the situation changed.
- you can introduce an empty path route (`{path: '', canActivate: [], runGuardsAndResolvers: 'always', children: [...]}`) and add the guard there. This is useful when the parent node already had a bunch of guards and you don't want to rerun them every time.

2. If you need to rerun resolvers:

- you can add `runGuardsAndResolvers: 'always'` next to every resolver, but it will create a lot of invocations.
- you can add a global variables called 'refreshing' and check for it in your resolvers annotated with `runGuardsAndResolvers: 'always'`. In this case the resolvers will be invoked every time, but you can skip the actual work if refreshing is set to false.
- if you have some cache with the data, you can set up your resolvers such that they only make requests when the cache is empty. So before the refresh you can empty the cache.
- to limit the number of invocations, you can add `runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'` and then use a fake query param (e.g., `refresh=1`) to trigger a refresh.
