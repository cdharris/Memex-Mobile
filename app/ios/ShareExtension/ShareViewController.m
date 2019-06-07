//
//  ShareViewController.m
//  ShareExtension
//
//  Created by Jonathan Poltak Samosir on 7/6/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "RCTRootView.h"

- (void) loadView
{
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ExampleApp"
                                               initialProperties:nil
                                                   launchOptions:nil];
  self.view = rootView;
  NSItemProvider *itemProvider = item.attachments.firstObject;
  [ShareMenuModule setShareMenuModule_itemProvider:itemProvider];
}
