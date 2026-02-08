-- ShopGui.client.luau
-- Forest Sprint Premium - In-Game Shop GUI
-- Client-side shop interface with purchase and equip functionality

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Wait for shop remotes
local shopRemotes = ReplicatedStorage:WaitForChild("ShopRemotes")
local getShopData = shopRemotes:WaitForChild("GetShopData")
local purchaseItem = shopRemotes:WaitForChild("PurchaseItem")
local equipItem = shopRemotes:WaitForChild("EquipItem")
local shopDataUpdate = shopRemotes:WaitForChild("ShopDataUpdate")

-- Import constants from shared
local ShopConstants = require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("Constants"):WaitForChild("ShopConstants"))

-- Colors
local COLORS = {
	background = Color3.fromRGB(15, 25, 15),
	accent = Color3.fromRGB(58, 125, 21),
	accentDark = Color3.fromRGB(35, 80, 12),
	text = Color3.fromRGB(255, 255, 255),
	textDim = Color3.fromRGB(180, 180, 180),
	button = Color3.fromRGB(45, 90, 20),
	buttonHover = Color3.fromRGB(65, 110, 30),
	dialogBg = Color3.fromRGB(20, 35, 20),
	rarity = {
		Common = Color3.fromRGB(255, 255, 255),
		Rare = Color3.fromRGB(0, 112, 221),
		Epic = Color3.fromRGB(163, 53, 238),
		Legendary = Color3.fromRGB(255, 128, 0),
	},
}

-- State
local shopData = nil
local currentCategory = "Trails"
local shopVisible = false
local selectedItem = nil
local itemFrames = {}

-- ═══════════════════════════════════════════════════════════
-- GUI CREATION
-- ═══════════════════════════════════════════════════════════

-- Main ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ShopGui"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
screenGui.Parent = playerGui

-- Shop Toggle Button (bottom-right)
local shopButton = Instance.new("TextButton")
shopButton.Name = "ShopButton"
shopButton.Size = UDim2.new(0, 100, 0, 40)
shopButton.Position = UDim2.new(1, -120, 1, -60)
shopButton.BackgroundColor3 = COLORS.accent
shopButton.TextColor3 = COLORS.text
shopButton.Text = "SHOP"
shopButton.TextSize = 16
shopButton.Font = Enum.Font.GothamBold
shopButton.Parent = screenGui

local shopButtonCorner = Instance.new("UICorner")
shopButtonCorner.CornerRadius = UDim.new(0, 8)
shopButtonCorner.Parent = shopButton

-- Main Shop Frame (centered, 70% x 80%)
local shopFrame = Instance.new("Frame")
shopFrame.Name = "ShopFrame"
shopFrame.Size = UDim2.new(0.7, 0, 0.8, 0)
shopFrame.Position = UDim2.new(0.15, 0, 0.1, 0)
shopFrame.BackgroundColor3 = COLORS.background
shopFrame.BorderSizePixel = 0
shopFrame.Visible = false
shopFrame.Parent = screenGui

local shopFrameCorner = Instance.new("UICorner")
shopFrameCorner.CornerRadius = UDim.new(0, 12)
shopFrameCorner.Parent = shopFrame

local shopFrameStroke = Instance.new("UIStroke")
shopFrameStroke.Color = COLORS.accent
shopFrameStroke.Thickness = 2
shopFrameStroke.Parent = shopFrame

-- ═══ HEADER ═══
local header = Instance.new("Frame")
header.Name = "Header"
header.Size = UDim2.new(1, 0, 0, 60)
header.Position = UDim2.new(0, 0, 0, 0)
header.BackgroundColor3 = COLORS.accentDark
header.BorderSizePixel = 0
header.Parent = shopFrame

local headerCorner = Instance.new("UICorner")
headerCorner.CornerRadius = UDim.new(0, 12)
headerCorner.Parent = header

-- Title
local titleLabel = Instance.new("TextLabel")
titleLabel.Name = "TitleLabel"
titleLabel.Size = UDim2.new(0.4, 0, 1, 0)
titleLabel.Position = UDim2.new(0, 20, 0, 0)
titleLabel.BackgroundTransparency = 1
titleLabel.TextColor3 = COLORS.text
titleLabel.Text = "FOREST SHOP"
titleLabel.TextSize = 28
titleLabel.Font = Enum.Font.GothamBold
titleLabel.TextXAlignment = Enum.TextXAlignment.Left
titleLabel.Parent = header

-- Coin Display
local coinDisplay = Instance.new("TextLabel")
coinDisplay.Name = "CoinDisplay"
coinDisplay.Size = UDim2.new(0.3, 0, 1, 0)
coinDisplay.Position = UDim2.new(0.4, 0, 0, 0)
coinDisplay.BackgroundTransparency = 1
coinDisplay.TextColor3 = Color3.fromRGB(255, 215, 0)
coinDisplay.Text = "0"
coinDisplay.TextSize = 24
coinDisplay.Font = Enum.Font.GothamBold
coinDisplay.TextXAlignment = Enum.TextXAlignment.Center
coinDisplay.Parent = header

-- Close Button
local closeButton = Instance.new("TextButton")
closeButton.Name = "CloseButton"
closeButton.Size = UDim2.new(0, 40, 0, 40)
closeButton.Position = UDim2.new(1, -50, 0, 10)
closeButton.BackgroundColor3 = Color3.fromRGB(180, 30, 30)
closeButton.TextColor3 = COLORS.text
closeButton.Text = "X"
closeButton.TextSize = 20
closeButton.Font = Enum.Font.GothamBold
closeButton.Parent = header

local closeCorner = Instance.new("UICorner")
closeCorner.CornerRadius = UDim.new(0, 6)
closeCorner.Parent = closeButton

-- ═══ CATEGORY TABS ═══
local categoryTabs = Instance.new("Frame")
categoryTabs.Name = "CategoryTabs"
categoryTabs.Size = UDim2.new(1, 0, 0, 40)
categoryTabs.Position = UDim2.new(0, 0, 0, 60)
categoryTabs.BackgroundTransparency = 1
categoryTabs.Parent = shopFrame

local tabLayout = Instance.new("UIListLayout")
tabLayout.FillDirection = Enum.FillDirection.Horizontal
tabLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
tabLayout.Padding = UDim.new(0, 4)
tabLayout.Parent = categoryTabs

local categoryButtons = {}
local categoryDisplayNames = {
	Trails = "Trails",
	Skins = "Skins",
	PlatformThemes = "Themes",
	PowerUps = "PowerUps",
}

for _, cat in ipairs(ShopConstants.CATEGORIES) do
	local tabBtn = Instance.new("TextButton")
	tabBtn.Name = "Tab_" .. cat
	tabBtn.Size = UDim2.new(0, 120, 0, 35)
	tabBtn.BackgroundColor3 = COLORS.button
	tabBtn.TextColor3 = COLORS.text
	tabBtn.Text = categoryDisplayNames[cat] or cat
	tabBtn.TextSize = 14
	tabBtn.Font = Enum.Font.GothamBold
	tabBtn.Parent = categoryTabs

	local tabCorner = Instance.new("UICorner")
	tabCorner.CornerRadius = UDim.new(0, 6)
	tabCorner.Parent = tabBtn

	categoryButtons[cat] = tabBtn
end

-- ═══ ITEM GRID ═══
local itemGrid = Instance.new("ScrollingFrame")
itemGrid.Name = "ItemGrid"
itemGrid.Size = UDim2.new(1, -20, 1, -115)
itemGrid.Position = UDim2.new(0, 10, 0, 105)
itemGrid.BackgroundTransparency = 1
itemGrid.ScrollBarThickness = 6
itemGrid.ScrollBarImageColor3 = COLORS.accent
itemGrid.CanvasSize = UDim2.new(0, 0, 0, 0)
itemGrid.AutomaticCanvasSize = Enum.AutomaticSize.Y
itemGrid.Parent = shopFrame

local gridLayout = Instance.new("UIGridLayout")
gridLayout.CellSize = UDim2.new(0, 180, 0, 220)
gridLayout.CellPadding = UDim2.new(0, 10, 0, 10)
gridLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
gridLayout.SortOrder = Enum.SortOrder.LayoutOrder
gridLayout.Parent = itemGrid

-- ═══ PURCHASE CONFIRM DIALOG ═══
local purchaseDialog = Instance.new("Frame")
purchaseDialog.Name = "PurchaseConfirmDialog"
purchaseDialog.Size = UDim2.new(0, 350, 0, 250)
purchaseDialog.Position = UDim2.new(0.5, -175, 0.5, -125)
purchaseDialog.BackgroundColor3 = COLORS.dialogBg
purchaseDialog.BorderSizePixel = 0
purchaseDialog.Visible = false
purchaseDialog.ZIndex = 10
purchaseDialog.Parent = screenGui

local dialogCorner = Instance.new("UICorner")
dialogCorner.CornerRadius = UDim.new(0, 12)
dialogCorner.Parent = purchaseDialog

local dialogStroke = Instance.new("UIStroke")
dialogStroke.Color = COLORS.accent
dialogStroke.Thickness = 2
dialogStroke.Parent = purchaseDialog

-- Dialog item name
local dialogItemName = Instance.new("TextLabel")
dialogItemName.Name = "ItemName"
dialogItemName.Size = UDim2.new(1, -20, 0, 40)
dialogItemName.Position = UDim2.new(0, 10, 0, 15)
dialogItemName.BackgroundTransparency = 1
dialogItemName.TextColor3 = COLORS.text
dialogItemName.Text = "Item Name"
dialogItemName.TextSize = 22
dialogItemName.Font = Enum.Font.GothamBold
dialogItemName.TextXAlignment = Enum.TextXAlignment.Center
dialogItemName.ZIndex = 11
dialogItemName.Parent = purchaseDialog

-- Dialog price
local dialogPrice = Instance.new("TextLabel")
dialogPrice.Name = "Price"
dialogPrice.Size = UDim2.new(1, -20, 0, 30)
dialogPrice.Position = UDim2.new(0, 10, 0, 60)
dialogPrice.BackgroundTransparency = 1
dialogPrice.TextColor3 = Color3.fromRGB(255, 215, 0)
dialogPrice.Text = "Price: 0"
dialogPrice.TextSize = 18
dialogPrice.Font = Enum.Font.GothamBold
dialogPrice.TextXAlignment = Enum.TextXAlignment.Center
dialogPrice.ZIndex = 11
dialogPrice.Parent = purchaseDialog

-- Dialog description
local dialogDesc = Instance.new("TextLabel")
dialogDesc.Name = "Description"
dialogDesc.Size = UDim2.new(1, -30, 0, 60)
dialogDesc.Position = UDim2.new(0, 15, 0, 95)
dialogDesc.BackgroundTransparency = 1
dialogDesc.TextColor3 = COLORS.textDim
dialogDesc.Text = "Description"
dialogDesc.TextSize = 14
dialogDesc.Font = Enum.Font.Gotham
dialogDesc.TextWrapped = true
dialogDesc.TextXAlignment = Enum.TextXAlignment.Center
dialogDesc.ZIndex = 11
dialogDesc.Parent = purchaseDialog

-- Confirm Button
local confirmButton = Instance.new("TextButton")
confirmButton.Name = "ConfirmButton"
confirmButton.Size = UDim2.new(0, 120, 0, 40)
confirmButton.Position = UDim2.new(0.25, -60, 1, -60)
confirmButton.BackgroundColor3 = COLORS.accent
confirmButton.TextColor3 = COLORS.text
confirmButton.Text = "BUY"
confirmButton.TextSize = 18
confirmButton.Font = Enum.Font.GothamBold
confirmButton.ZIndex = 11
confirmButton.Parent = purchaseDialog

local confirmCorner = Instance.new("UICorner")
confirmCorner.CornerRadius = UDim.new(0, 8)
confirmCorner.Parent = confirmButton

-- Cancel Button
local cancelButton = Instance.new("TextButton")
cancelButton.Name = "CancelButton"
cancelButton.Size = UDim2.new(0, 120, 0, 40)
cancelButton.Position = UDim2.new(0.75, -60, 1, -60)
cancelButton.BackgroundColor3 = Color3.fromRGB(100, 40, 40)
cancelButton.TextColor3 = COLORS.text
cancelButton.Text = "CANCEL"
cancelButton.TextSize = 18
cancelButton.Font = Enum.Font.GothamBold
cancelButton.ZIndex = 11
cancelButton.Parent = purchaseDialog

local cancelCorner = Instance.new("UICorner")
cancelCorner.CornerRadius = UDim.new(0, 8)
cancelCorner.Parent = cancelButton

-- ═══════════════════════════════════════════════════════════
-- FUNCTIONS
-- ═══════════════════════════════════════════════════════════

local function updateCoinDisplay()
	if shopData then
		coinDisplay.Text = tostring(shopData.coins or 0)
	end
end

local function isOwned(itemId)
	if not shopData or not shopData.purchases then return false end
	return shopData.purchases[itemId] ~= nil
end

local function isEquipped(itemId)
	if not shopData or not shopData.equipped then return false end
	for _, equippedId in pairs(shopData.equipped) do
		if equippedId == itemId then return true end
	end
	return false
end

local function createItemCard(item, layoutOrder)
	local card = Instance.new("Frame")
	card.Name = "Item_" .. item.id
	card.BackgroundColor3 = Color3.fromRGB(25, 40, 25)
	card.BorderSizePixel = 0
	card.LayoutOrder = layoutOrder

	local cardCorner = Instance.new("UICorner")
	cardCorner.CornerRadius = UDim.new(0, 8)
	cardCorner.Parent = card

	-- Rarity border
	local rarityStroke = Instance.new("UIStroke")
	rarityStroke.Color = COLORS.rarity[item.rarity] or COLORS.text
	rarityStroke.Thickness = 2
	rarityStroke.Parent = card

	-- Item name
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, -10, 0, 35)
	nameLabel.Position = UDim2.new(0, 5, 0, 10)
	nameLabel.BackgroundTransparency = 1
	nameLabel.TextColor3 = COLORS.text
	nameLabel.Text = item.name
	nameLabel.TextSize = 16
	nameLabel.Font = Enum.Font.GothamBold
	nameLabel.TextWrapped = true
	nameLabel.TextXAlignment = Enum.TextXAlignment.Center
	nameLabel.Parent = card

	-- Rarity label
	local rarityLabel = Instance.new("TextLabel")
	rarityLabel.Size = UDim2.new(1, -10, 0, 20)
	rarityLabel.Position = UDim2.new(0, 5, 0, 45)
	rarityLabel.BackgroundTransparency = 1
	rarityLabel.TextColor3 = COLORS.rarity[item.rarity] or COLORS.textDim
	rarityLabel.Text = item.rarity
	rarityLabel.TextSize = 12
	rarityLabel.Font = Enum.Font.Gotham
	rarityLabel.TextXAlignment = Enum.TextXAlignment.Center
	rarityLabel.Parent = card

	-- Description
	local descLabel = Instance.new("TextLabel")
	descLabel.Size = UDim2.new(1, -10, 0, 50)
	descLabel.Position = UDim2.new(0, 5, 0, 70)
	descLabel.BackgroundTransparency = 1
	descLabel.TextColor3 = COLORS.textDim
	descLabel.Text = item.description
	descLabel.TextSize = 11
	descLabel.Font = Enum.Font.Gotham
	descLabel.TextWrapped = true
	descLabel.TextXAlignment = Enum.TextXAlignment.Center
	descLabel.Parent = card

	-- Price / Status
	local priceLabel = Instance.new("TextLabel")
	priceLabel.Name = "PriceLabel"
	priceLabel.Size = UDim2.new(1, -10, 0, 25)
	priceLabel.Position = UDim2.new(0, 5, 0, 125)
	priceLabel.BackgroundTransparency = 1
	priceLabel.TextSize = 14
	priceLabel.Font = Enum.Font.GothamBold
	priceLabel.TextXAlignment = Enum.TextXAlignment.Center
	priceLabel.Parent = card

	-- Action Button
	local actionBtn = Instance.new("TextButton")
	actionBtn.Name = "ActionButton"
	actionBtn.Size = UDim2.new(1, -20, 0, 35)
	actionBtn.Position = UDim2.new(0, 10, 1, -45)
	actionBtn.TextSize = 14
	actionBtn.Font = Enum.Font.GothamBold
	actionBtn.Parent = card

	local actionCorner = Instance.new("UICorner")
	actionCorner.CornerRadius = UDim.new(0, 6)
	actionCorner.Parent = actionBtn

	-- Update card state based on ownership
	local function updateCardState()
		if isEquipped(item.id) then
			priceLabel.Text = "EQUIPPED"
			priceLabel.TextColor3 = COLORS.accent
			actionBtn.Text = "EQUIPPED"
			actionBtn.BackgroundColor3 = COLORS.accentDark
			actionBtn.TextColor3 = COLORS.text
		elseif isOwned(item.id) then
			priceLabel.Text = "OWNED"
			priceLabel.TextColor3 = Color3.fromRGB(100, 200, 100)
			actionBtn.Text = "EQUIP"
			actionBtn.BackgroundColor3 = COLORS.accent
			actionBtn.TextColor3 = COLORS.text
		else
			priceLabel.Text = tostring(item.price)
			priceLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
			actionBtn.Text = "BUY"
			actionBtn.BackgroundColor3 = COLORS.button
			actionBtn.TextColor3 = COLORS.text
		end
	end

	updateCardState()

	-- Action button click handler
	actionBtn.MouseButton1Click:Connect(function()
		if isEquipped(item.id) then
			-- Already equipped, do nothing
			return
		elseif isOwned(item.id) then
			-- Equip the item
			equipItem:FireServer(item.id)
		else
			-- Show purchase dialog
			selectedItem = item
			dialogItemName.Text = item.name
			dialogPrice.Text = "Price: " .. tostring(item.price)
			dialogDesc.Text = item.description
			purchaseDialog.Visible = true
		end
	end)

	card._updateState = updateCardState
	return card
end

local function refreshItemGrid()
	-- Clear existing items
	for _, child in ipairs(itemGrid:GetChildren()) do
		if child:IsA("Frame") then
			child:Destroy()
		end
	end
	itemFrames = {}

	-- Filter items by current category
	local order = 0
	for _, item in ipairs(ShopConstants.ITEMS) do
		if item.category == currentCategory then
			order = order + 1
			local card = createItemCard(item, order)
			card.Parent = itemGrid
			itemFrames[item.id] = card
		end
	end
end

local function updateAllCardStates()
	for _, card in pairs(itemFrames) do
		if card._updateState then
			card._updateState()
		end
	end
end

local function selectCategory(cat)
	currentCategory = cat

	-- Update tab visuals
	for catName, btn in pairs(categoryButtons) do
		if catName == cat then
			btn.BackgroundColor3 = COLORS.accent
		else
			btn.BackgroundColor3 = COLORS.button
		end
	end

	refreshItemGrid()
end

local function toggleShop()
	shopVisible = not shopVisible
	shopFrame.Visible = shopVisible

	if shopVisible then
		-- Refresh data from server
		local data = getShopData:InvokeServer()
		if data then
			shopData = data
			updateCoinDisplay()
			refreshItemGrid()
		end
	end
end

-- ═══════════════════════════════════════════════════════════
-- EVENT CONNECTIONS
-- ═══════════════════════════════════════════════════════════

-- Shop toggle button
shopButton.MouseButton1Click:Connect(toggleShop)

-- Close button
closeButton.MouseButton1Click:Connect(function()
	shopVisible = false
	shopFrame.Visible = false
end)

-- Category tab clicks
for cat, btn in pairs(categoryButtons) do
	btn.MouseButton1Click:Connect(function()
		selectCategory(cat)
	end)
end

-- Purchase confirm
confirmButton.MouseButton1Click:Connect(function()
	if selectedItem then
		local success, message = purchaseItem:InvokeServer(selectedItem.id)
		purchaseDialog.Visible = false

		if success then
			print(string.format("[ShopGui] Purchased %s", selectedItem.name))
		else
			print(string.format("[ShopGui] Purchase failed: %s", tostring(message)))
		end

		selectedItem = nil
	end
end)

-- Purchase cancel
cancelButton.MouseButton1Click:Connect(function()
	purchaseDialog.Visible = false
	selectedItem = nil
end)

-- Server data push (real-time updates)
shopDataUpdate.OnClientEvent:Connect(function(data)
	if data then
		shopData = data
		updateCoinDisplay()
		updateAllCardStates()
	end
end)

-- Initialize with default category
selectCategory("Trails")

-- Load initial data
spawn(function()
	local data = getShopData:InvokeServer()
	if data then
		shopData = data
		updateCoinDisplay()
		refreshItemGrid()
	end
end)

print("[ShopGui] ✅ Shop GUI Ready - Forest Sprint Premium")
