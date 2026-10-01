import { Component, DestroyRef, ElementRef, inject, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonMenu,
  IonProgressBar,
  IonSplitPane,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonThumbnail,
  IonToolbar,
} from '@demo/ionic';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonItemGroup,
    IonItem,
    IonToolbar,
    IonThumbnail,
    IonButton,
    IonButtons,
    IonProgressBar,
  ],
})
export class TabsPage implements OnInit {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
  readonly #destroyRef = inject(DestroyRef);
  playing = true;
  showAccessory = false;
  accessoryActivated = false;

  ngOnInit() {
    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((params) => {
        const tabBar = this.#el.nativeElement.querySelector('ion-tab-bar');
        if (!tabBar) {
          return;
        }
        const path = params.urlAfterRedirects.split(/[?#]/, 1)[0];
        const hideTabs = ['/main/settings'].includes(path);
        if (hideTabs) {
          tabBar.classList.add('tab-bar-hidden');
        } else {
          tabBar.classList.remove('tab-bar-hidden');
        }
        this.showAccessory = !hideTabs && (path === '/main/album' || /[?&]miniPlayer(?:=|$|&)/.test(params.urlAfterRedirects));
      });
  }

  togglePlay(event: Event) {
    event.stopPropagation();
    this.playing = !this.playing;
  }

  onAccessoryActivate() {
    this.accessoryActivated = true;
  }
}
