const { ccclass, property } = cc._decorator;

@ccclass
export default class PQQ extends cc.Component {
    @property
    moreGamePortal: any = null;
    
    @property
    moreGameBanner: any = null;
    
    @property
    moreGameBannerLeft: number = 16;
    
    @property
    moreGameBannerTop: number = 16;
    
    @property([cc.Node])
    multiMoreGameBanner: any[] = [];
    
    private env: any;
    private info: any;
    private sceneID: any;
    private bh: number = 0;
    private bw: number = 0;
    private logined: boolean = false;
    private insterstitialAd: any;
    private bannerAd: any;
    private gameRecordShareBtn: any;

    onLoad() {
        this.init();
    }

    init() {
        this.env = window['qq'];
        this.info = (window['lplatform'] && window['lplatform'].systemInfo) || this.env.getSystemInfoSync();
        this.sceneID = this.env.getLaunchOptionsSync().scene;
        this.bh = window['lplatform'].cparam.bannerHeight || 170;
        this.bw = window['lplatform'].cparam.bannerWidth || Math.min(this.info.windowWidth, 16 * this.bh / 9);
        this.logined = false;
        this.showShareMenu();
        this.checkLogin();
    }

    initAD() {
        this.loadBanner(false);
        this.loadInterstitial(false);
        this.createRewardedVideo(false);
    }

    checkLogin() {
        const self = this;
        this.env.checkSession({
            success: function() {
                self.logined = true;
            },
            fail: function() {
                self.env.login({
                    success: function(t: any) {
                        if (t.code) {
                            self.logined = true;
                        } else {
                            console.log("登录失败！" + t.errMsg);
                        }
                    }
                });
            }
        });
    }

    showFavoriteGuide() {
        this.env.addToFavorites({
            title: "加关注，不迷路。",
            imageUrl: "",
            query: "a=1&b=2",
            success: function() {},
            fail: function(e: any) {
                console.log("addToFavorites fail", e);
            },
            complete: function() {}
        });

        setTimeout(function() {
            this.saveAppToDesktop();
        }.bind(this), 15000);

        setTimeout(function() {
            this.addRecentColorSign();
        }.bind(this), 100000);
    }

    showShareMenu() {
        if (typeof this.env.showShareMenu === 'function') {
            this.env.showShareMenu({
                showShareItems: ["qq", "qzone", "wechatFriends", "wechatMoment"]
            });
        }

        this.env.onShareAppMessage(function() {
            window['lplatform'].plog("onShareAppMessage lplatform.cparam.shareAppImgUrl:" + window['lplatform'].cparam.shareAppImgUrl);
            return {
                title: window['lplatform'].cparam.shareAppTitle,
                imageUrl: window['lplatform'].cparam.shareAppImgUrl
            };
        });
    }

    shareAppMessage(successCallback?: Function, failCallback?: Function) {
        window['lplatform'].plog("shareAppMessage lplatform.cparam.shareAppImgUrl:" + window['lplatform'].cparam.shareAppImgUrl);
        this.env.shareAppMessage({
            title: window['lplatform'].cparam.shareAppTitle,
            imageUrl: window['lplatform'].cparam.shareAppImgUrl,
            success: function() {
                successCallback && successCallback();
            },
            fail: function() {
                failCallback && failCallback();
            }
        });
    }

    shareRecord(successCallback?: Function, failCallback?: Function) {
        this.shareAppMessage(successCallback, failCallback);
    }

    makeShareUI(successCallback?: Function, failCallback?: Function, type?: any, delay: number = 0, autoHide: boolean = false) {
        window['lplatform'].uiEngine.CreateShareK(
            function() {
                this.shareRecord(successCallback, failCallback);
            }.bind(this),
            function() {
                failCallback && failCallback();
                this.gameRecordShareBtn && this.gameRecordShareBtn.hide();
            }.bind(this),
            type,
            delay,
            false
        );
    }

    showInterstitial() {
        const self = this;
        if (window['lplatform'].labData.mainSwitch && window['lplatform'].labData.mainSwitch === 1) {
            if (this.insterstitialAd) {
                this.insterstitialAd.show().catch(function(t: any) {
                    window['lplatform'].plog("showInterstitial cache:" + JSON.stringify(t));
                    self.createMoreGamePortal(true, true);
                });
            } else {
                this.loadInterstitial(true);
            }
        }
    }

    hideInterstitial() {
        if (this.moreGamePortal) {
            this.moreGamePortal.destroy();
        }
    }

    createMoreGamePortal(forceCreate: boolean = false, autoShow: boolean = true) {
        const self = this;
        if (typeof this.env.createAppBox === 'function' && 
            window['lplatform'].cparam.moreGamePortalAppId && 
            window['lplatform'].cparam.moreGamePortalAppId.length > 0) {
            
            if (forceCreate && this.moreGamePortal) {
                this.moreGamePortal.destroy();
                this.moreGamePortal = null;
            }

            if (!this.moreGamePortal) {
                const randomIndex = Math.floor(Math.random() * window['lplatform'].cparam.moreGamePortalAppId.length);
                const appId = window['lplatform'].cparam.moreGamePortalAppId[randomIndex];
                window['lplatform'].plog("QQ createMoreGamePortal baid:" + appId);
                this.moreGamePortal = this.env.createAppBox({
                    adUnitId: appId
                });
            }

            window['lplatform'].plog("QQ createMoreGamePortal autoShow:" + autoShow);
            this.moreGamePortal.load().then(function() {
                if (autoShow) {
                    self.moreGamePortal.show();
                }
            }).catch(function(e: any) {
                window['lplatform'].plog("moreGamePortal load catch:" + JSON.stringify(e));
                self.env.showToast({
                    title: "暂无广告",
                    icon: "none",
                    duration: 2000
                });
            });
        }
    }

    showRealBanner() {
        if (this.bannerAd) {
            console.log("is have Banner");
            this.bannerAd.show();
        } else {
            console.log("no Banner");
            this.loadBanner(true);
        }
    }

    showBanner() {
        this.hideBanner();
        if (window['lplatform'].labData.mainSwitch) {
            if (Math.random() <= window['lplatform'].cparam.moreGameBannerPercent) {
                this.createMoreGameBanner(true, true);
            } else {
                this.showRealBanner();
            }
        }
    }

    hideBanner(destroy: boolean = false) {
        if (this.bannerAd) {
            this.bannerAd.hide();
            if (destroy) {
                this.bannerAd.offLoad(this.onBannerLoad);
                this.bannerAd.offError(this.onBannerError);
                this.bannerAd.offResize(this.onBannerResize);
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        if (this.moreGameBanner) {
            this.moreGameBanner.hide();
        }
    }

    hideMoreGameBanner() {
        if (this.moreGameBanner) {
            this.moreGameBanner.offResize(function() {});
            this.moreGameBanner.offLoad(function() {});
            this.moreGameBanner.offError(function() {});
            this.moreGameBanner.destroy();
            this.moreGameBanner = null;
        }
    }

    createMoreGameBanner(forceCreate: boolean = false, autoShow: boolean = false) {
        if (typeof this.env.createBlockAd === 'function' && window['lplatform'].cparam.moreGameBannerAppId) {
            const self = this;
            
            if (forceCreate && this.moreGameBanner) {
                this.moreGameBanner.offResize(function() {});
                this.moreGameBanner.offLoad(function() {});
                this.moreGameBanner.offError(function() {});
                this.moreGameBanner.destroy();
                this.moreGameBanner = null;
            }

            if (!this.moreGameBanner) {
                const randomIndex = Math.floor(Math.random() * window['lplatform'].cparam.moreGameBannerAppId.length);
                const appId = window['lplatform'].cparam.moreGameBannerAppId[randomIndex];
                
                window['lplatform'].plog("QQ createMoreGameBanner baid:" + appId + " this.moreGameBannerLeft:" + this.moreGameBannerLeft + " this.moreGameBannerTop:" + this.moreGameBannerTop);
                
                this.moreGameBanner = this.env.createBlockAd({
                    adUnitId: appId,
                    style: {
                        left: Math.max(0, this.moreGameBannerLeft),
                        top: Math.max(0, this.moreGameBannerTop)
                    },
                    size: 5,
                    orientation: "vertical"
                });

                this.moreGameBanner.onResize(function(e: any) {
                    self.moreGameBannerTop = 0;
                    self.moreGameBanner.style.top = Math.max(0, (self.info.windowHeight - e.height) / 2);
                    self.moreGameBanner.style.left = 10;
                    window['lplatform'].plog("QQ createMoreGameBanner onResize size:" + JSON.stringify(e) + " top:" + self.moreGameBanner.style.top + " left:" + self.moreGameBanner.style.left);
                });

                this.moreGameBanner.onLoad(function() {
                    window['lplatform'].plog("QQ createMoreGameBanner onLoad autoShow:" + autoShow);
                    if (autoShow) {
                        self.moreGameBanner.show();
                    }
                });

                this.moreGameBanner.onError(function(e: any) {
                    window['lplatform'].plog("QQ createmoreGameBanner onError res:" + JSON.stringify(e));
                });
            }
        }
    }

    createOutMoreGameBanner(position: any, size?: number, orientation?: string, appId?: string) {
        const x = position.x;
        const y = position.y;
        const banner = this.env.createBlockAd({
            adUnitId: appId,
            style: {
                left: x,
                top: y
            },
            size: size || 1,
            orientation: orientation || "vertical"
        });

        banner.onResize(function(resizeInfo: any) {
            banner.style.left = Math.max(0, position.x - resizeInfo.width / 2 / 1);
            banner.style.top = 10;
        });

        banner.onLoad(function() {
            banner.show();
        });

        banner.onError(function(e: any) {
            window['lplatform'].plog("QQ createOutMoreGameBanner onError res:" + JSON.stringify(e));
        });

        return banner;
    }

    createMultiMoreGameBanner() {
        for (let i = 0; i < window['lplatform'].cparam.mmgPos.length; i++) {
            if (this.multiMoreGameBanner[i]) {
                this.multiMoreGameBanner[i].offResize(function() {});
                this.multiMoreGameBanner[i].offLoad(function() {});
                this.multiMoreGameBanner[i].offError(function() {});
                this.multiMoreGameBanner[i].destroy();
                this.multiMoreGameBanner[i] = null;
            }

            if (!this.multiMoreGameBanner[i]) {
                const position = {
                    x: this.info.windowWidth * window['lplatform'].cparam.mmgPos[i].x,
                    y: this.info.windowHeight * window['lplatform'].cparam.mmgPos[i].y
                };
                const size = window['lplatform'].cparam.mmgSize[i];
                const orientation = window['lplatform'].cparam.mmgOrientation[i];
                const appId = window['lplatform'].cparam.mmgId[i];
                
                this.multiMoreGameBanner[i] = this.createOutMoreGameBanner(position, size, orientation, appId);
            }
        }
    }

    canRecord(): boolean {
        console.log("不支持录制游戏画面");
        return false;
    }

    canShareRecord(): boolean {
        return true;
    }

    goToGameOrGameList() {
        window['lplatform'].plog("qq未实现 goToGameOrGameList");
    }

    shareMessageToFriend() {}

    saveAppToDesktop() {
        this.env.saveAppToDesktop({
            success: function() {},
            fail: function() {},
            complete: function() {}
        });
    }

    subscribeAppMsg() {
        this.env.subscribeAppMsg({
            tmplIds: window['lplatform'].cparam.tmplIds,
            subscribe: true,
            success: function(e: any) {
                console.log("----subscribeAppMsg----success", e);
            },
            fail: function(e: any) {
                console.log("----subscribeAppMsg----fail", e);
            }
        });
    }

    sendMsgToOpenDataProject(msg: any) {
        if (this.logined) {
            super.sendMsgToOpenDataProject(msg);
        } else {
            this.checkLogin();
        }
    }

    setUserCloudStorage(data: any) {
        this.sendMsgToOpenDataProject({
            name: "setUserCloudStorage",
            kvdata: data
        });
    }

    addRecentColorSign() {
        this.env.addRecentColorSign({
            query: "a=1&b=2",
            success: function() {},
            fail: function(e: any) {
                console.log("addRecentColorSign fail: ", e);
            },
            complete: function() {}
        });
    }

    private loadBanner(show: boolean) {
        // Implementation for loading banner
    }

    private loadInterstitial(show: boolean) {
        // Implementation for loading interstitial
    }

    private createRewardedVideo(show: boolean) {
        // Implementation for creating rewarded video
    }

    private onBannerLoad() {
        // Banner load callback
    }

    private onBannerError() {
        // Banner error callback
    }

    private onBannerResize() {
        // Banner resize callback
    }
}