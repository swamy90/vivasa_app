//
//  UITextField+Extension.swift
//
//
//  Created by Mukesh Thawani on 04/05/17.
//

import Foundation
import UIKit

extension UITextField {
    var placeholderColor: UIColor {
        get {
            return attributedPlaceholder?.attribute(.foregroundColor, at: 0, effectiveRange: nil) as? UIColor ?? .clear
        }
        set {
            guard let attributedPlaceholder = attributedPlaceholder else { return }
            let attributes: [NSAttributedString.Key: UIColor] = [.foregroundColor: newValue]
            self.attributedPlaceholder = NSAttributedString(string: attributedPlaceholder.string, attributes: attributes)
        }
    }

    func trimmedWhitespaceText() -> String {
        if let text = text {
            return text.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        return ""
    }
}
