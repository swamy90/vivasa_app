//
//  ALKChannelDetailViewConfiguration.swift
//  KommunicateChatUI-iOS-SDK
//
//  Created by Sunil on 14/08/19.
//

import Foundation
import UIKit
#if canImport(RichMessageKit)
    import RichMessageKit
#endif

/// A type that can be used to configure channel detail view like changing member name label color, title font etc.
public struct ALKChannelDetailViewConfiguration {
    /// Button Style for save and invite style
    public var button = Style(
        font: Font.normal(size: 15.0).font(),
        text: .white,
        background: UIColor.mainRed()
    )

    /// Participant text style
    public var participantHeaderTitle = Style(
        font: Font.normal(size: 15.0).font(),
        text: UIColor.mainRed()
    )

    /// Edit text view border color
    public var groupNameBorderColor = UIColor.red

    /// Profile edit lable style
    public var editLabel = Style(
        font: Font.normal(size: 15.0).font(),
        text: UIColor.black,
        background: UIColor.lineBreakerProfile()
    )

    /// Default group icon
    public var defaultGroupIcon = UIImage(named: "group_profile_picture", in: Bundle.km, compatibleWith: nil)

    /// Add member icon
    public var addMemberIcon = UIImage(named: "icon_add_people-1", in: Bundle.km, compatibleWith: nil)

    /// Add memberName text style
    public var memberName = Style(
        font: Font.normal(size: 15.0).font(),
        text: UIColor.mainRed()
    )
    /// Group name text style
    public var groupName = Style(
        font: Font.normal(size: 15.0).font(),
        text: UIColor.black
    )

    /// If true, then group description edit will be disabled.
    public var disableGroupDescriptionEdit = false

    public init() {}
}
