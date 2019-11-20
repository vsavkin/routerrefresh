import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, Injectable } from '@angular/core';
import {
  RouterModule,
  CanActivateChild,
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { AppComponent } from './app.component';
@Component({
  selector: 'child',
  template: `
    child
  `
})
class ChildComponent {}

@Component({
  selector: 'parent',
  template: `
    parent

    <router-outlet></router-outlet>
  `
})
class ParentComponent {}

@Injectable()
class CheckChild implements CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot) {
    console.log('canActivateChild', childRoute);
    return true;
  }
}

@Injectable()
class CheckSelf implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // we can extract the right child route by traversing the state
    // (routeConfig returns the route config, so we could check routeConfig.path === 'child' to find the child)
    const childRoute = state.root.firstChild.firstChild;
    const childRouteConfig = childRoute.routeConfig;
    console.log('canActivate', route);
    return true;
  }
}

@Injectable()
class ResolveSelf implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    console.log('resolve', route);
    return true;
  }
}

@NgModule({
  declarations: [AppComponent, ParentComponent, ChildComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/parent/child'
        },
        {
          path: 'parent',
          component: ParentComponent,
          canActivate: [CheckSelf],
          canActivateChild: [CheckChild],
          resolve: { data: ResolveSelf },
          runGuardsAndResolvers: 'always',
          children: [
            {
              path: 'child',
              component: ChildComponent,
              runGuardsAndResolvers: 'always'
            }
          ]
        }
      ],
      { onSameUrlNavigation: 'reload', enableTracing: false }
    )
  ],
  providers: [CheckSelf, CheckChild, ResolveSelf],
  bootstrap: [AppComponent]
})
export class AppModule {}
